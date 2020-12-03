const Tabelas = require('../database/tabelas.js');

const conFirebase = require("../database/firebase.js");
const database = conFirebase.database();
const refCliente = database.ref('clientes');

const UsuarioService = require('./usuario.service');
const PedidoService = require('./pedido.service');

const { TratarVetor, TratarObjeto } = require('../utils/service');

// MÉTODO QUE BUSCA CLIENTE POR ID
module.exports.Get = async (id) => {

    try {
        return refCliente.child(id).once('value')
            .then(snapshot => {
                let cliente = TratarObjeto(snapshot, id);
                return UsuarioService.Get(cliente.usuarioID)
                    .then(u => {
                        cliente.usuario = u;
                        cliente.usuarioID = undefined;
                        return cliente;
                    });
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE BUSCA TODOS OS CLIENTES
module.exports.GetAll = () => {

    try {
        return refCliente.once('value')
            .then(snapshot => {
                let clientes = TratarVetor(snapshot);

                return UsuarioService.GetAll()
                    .then(usuarios => {
                        clientes.forEach(c => {
                            c.usuario = usuarios.filter(u => u.id === c.usuarioID)[0];
                            c.usuarioID = undefined;
                        });
                        return clientes;
                    });
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE BUSCA TODOS OS CLIENTES
module.exports.GetPedidos = async (idCliente) => {

    try {
        return PedidoService.GetAll()
            .then(pedidos => {
                return pedidos.filter(p => p.cliente.id == idCliente);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE CRIA O CLIENTE
module.exports.Create = (cliente) => {

    try {
        // antes inserir o cliente, é necessário inserir o usuário.
        return UsuarioService.Create(cliente.usuario)
            .then((u) => {
                let autoId = refCliente.push().key;
                cliente.usuarioID = u.id;
                cliente.usuario = null;
                return refCliente.child(autoId)
                    .set(cliente)
                    .then(() => {
                        return this.Get(autoId);
                    });
            })
            .catch(err => {
                console.log(err);
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