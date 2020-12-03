const Tabelas = require('../database/tabelas.js');

const conFirebase = require("../database/firebase.js");
const database = conFirebase.database();
const refPedido = database.ref('pedidos');

const ClienteService = require('../services/cliente.service.js');
const EstabelecimentoService = require('../services/estabelecimento.service.js');

const { TratarVetor, TratarObjeto } = require('../utils/service');

// MÉTODO QUE BUSCA CLIENTE POR ID
module.exports.Get = (id) => {

    try {
        return refPedido.child(id).once('value')
            .then(snapshot => {
                let pedido = TratarObjeto(snapshot, id);

                return refPedido.child(id + "/listaItens").once('value')
                    .then(snapshot => {
                        pedido.listaItens = TratarVetor(snapshot);
                        return ClienteService.Get(pedido.clienteID)
                            .then(c => {
                                pedido.cliente = c;
                                pedido.clienteID = undefined;

                                return EstabelecimentoService.Get(pedido.estabelecimentoID)
                                    .then(e => {
                                        pedido.estabelecimento = e;
                                        pedido.estabelecimentoID = undefined;
                                        return pedido;
                                    });
                            });
                    });

            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE BUSCA TODOS OS PEDIDOS
module.exports.GetAll = async () => {

    try {
        let pedidos = await refPedido.once('value')
            .then(snapshot => {
                let pedidos = TratarVetor(snapshot);
                return pedidos;
            });

        let pedidosRetorno = [];

        const promisse = pedidos.map(async (p) => {
            await this.Get(p.id)
                .then(pedido => {
                    console.log(pedido);
                    pedidosRetorno.push(pedido);
                });
        });

        await Promise.all(promisse);

        return pedidosRetorno;
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE CRIA O CLIENTE
module.exports.Create = (pedido) => {

    try {
        let autoId = refPedido.push().key;
        let novoPedido = pedido;
        let lista = pedido.listaItens;
        novoPedido.listaItens = null;
        return refPedido.child(autoId)
            .set(novoPedido)
            .then(() => {

                lista.forEach((p) => {

                    let autoIdPedido = refPedido.push().key;
                    let novoItem = { ...p };
                    //console.log(pedido.estabelecimentoID, p.cardapioID);
                    EstabelecimentoService.BuscarCardapio(pedido.estabelecimentoID, p.cardapioID)
                        .then(c => {
                            //console.log(c);
                            novoItem = { ...c, qtdItens: p.qtdItens };
                            refPedido.child(autoId + "/listaItens/" + autoIdPedido)
                                .set(novoItem);
                        });
                });

                return this.Get(autoId);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE EDITA OS DADOS DO CLIENTE
module.exports.Edit = (id, cliente) => {

    try {
        return this.Get(id)
            .then(c => {
                let novoUsuario = cliente.usuario;
                let usuarioID = c.usuario.id;
                novoUsuario.id = null;

                // console.log(usuarioID, novoUsuario);
                return UsuarioService.Edit(usuarioID, novoUsuario)
                    .then(u => {
                        let novoCliente = cliente;
                        novoCliente.id = null;
                        novoCliente.usuarioID = c.usuario.id;
                        novoCliente.usuario = null;

                        console.log(id, novoCliente);
                        return refCliente.child(id)
                            .set(novoCliente)
                            .then(() => {
                                //console.log(novoCliente);
                                return this.Get(id);
                            });

                    })
                    .catch(err => {
                        console.log(err);
                    });

            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE REMOVE O CLIENTE POR ID
module.exports.Remove = (id) => {

    try {
        return this.Get(id)
            .then(c => {
                let usuarioID = c.usuario.id;
                console.log(usuarioID);
                UsuarioService.Remove(usuarioID)
                    .then(() => {
                        console.log('Removeu usuário');
                        return refCliente.child(id).remove();
                    })
                    .catch(err => {
                        console.log('aqui', err);
                    });
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(err);
    }
}