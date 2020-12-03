const Tabelas = require('../database/tabelas.js');

const conFirebase = require("../database/firebase.js");
const database = conFirebase.database();
const refEstabelecimento = database.ref('estabelecimentos');

const UsuarioService = require('./usuario.service');

const { TratarVetor, TratarObjeto } = require('../utils/service');

// MÉTODO QUE BUSCA CLIENTE POR ID
module.exports.Get = async (id) => {

    try {
        return refEstabelecimento.child(id).once('value')
            .then(snapshot => {
                let estabelecimento = TratarObjeto(snapshot, id);
                estabelecimento.cardapio = undefined;
                return UsuarioService.Get(estabelecimento.usuarioID)
                    .then(u => {
                        estabelecimento.usuario = u;
                        estabelecimento.usuarioID = undefined;
                        return estabelecimento;
                    });
            });
    } catch (error) {
        console.log(error);
    }
}

function AjustarVetor(data) {
    data.forEach(function (item) {
        item.cardapio = undefined;
    });
}

// MÉTODO QUE BUSCA TODOS OS CLIENTES
module.exports.GetAll = () => {

    try {
        return refEstabelecimento.once('value')
            .then(snapshot => {
                let estabelecimentos = TratarVetor(snapshot);
                AjustarVetor(estabelecimentos);

                return UsuarioService.GetAll()
                    .then(usuarios => {
                        estabelecimentos.forEach(e => {
                            e.usuario = usuarios.filter(u => u.id === e.usuarioID)[0];
                            e.usuarioID = undefined;
                        });
                        return estabelecimentos;
                    });
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports.GetLista = () => {

    try {
        return refEstabelecimento.once('value')
            .then(snapshot => {
                let estabelecimentos = TratarVetor(snapshot);
                let listaEstabelecimentos = [];

                estabelecimentos.forEach(e => {
                    listaEstabelecimentos.push({
                        id: e.id,
                        nome: e.nome,
                        rua: e.rua,
                        bairro: e.bairro,
                        numero: e.numero,
                        cidade: e.cidade,
                        estado: e.estado,
                        complemento: e.complemento,
                        cep: e.cep,
                        cnpj: e.cnpj,
                    });
                });

                return listaEstabelecimentos;

            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE CRIA O CLIENTE
module.exports.Create = (estabelecimento) => {

    try {
        // antes inserir o cliente, é necessário inserir o usuário.
        return UsuarioService.Create(estabelecimento.usuario)
            .then(u => {
                let autoId = refEstabelecimento.push().key;
                estabelecimento.usuarioID = u.id;
                estabelecimento.usuario = null;

                //console.log(estabelecimento);
                return refEstabelecimento.child(autoId)
                    .set(estabelecimento)
                    .then(() => {
                        //console.log('ok');
                        return this.Get(autoId);
                    })
                    .catch(err => {
                        console.log(u.id);
                        return UsuarioService.Remove(u.id)
                            .then(() => {
                                return Promise.status(500).resolve(err);
                            });
                    });
            })
            .catch(err => {
                console.log(error);
                return Promise.status(500).resolve(err);
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports.GravarCardapio = (idEstabelecimento, cardapio) => {
    try {

        let autoId = cardapio.id || refEstabelecimento.push().key;

        return refEstabelecimento.child(idEstabelecimento + '/cardapio/' + autoId)
            .set(cardapio)
            .then(() => {
                console.log('OK');
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports.BuscarCardapio = (idEstabelecimento, idCardapio) => {

    try {
        let path;
        if (idCardapio) {
            path = idEstabelecimento + '/cardapio/' + idCardapio;
        } else {
            path = idEstabelecimento + '/cardapio';
        }
        return refEstabelecimento.child(path).once('value')
            .then(snapshot => {
                if (idCardapio) {
                    return TratarObjeto(snapshot, idCardapio);
                } else {
                    return TratarVetor(snapshot);
                }
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE EDITA OS DADOS DO CLIENTE
module.exports.Edit = (id, estabelecimento) => {

    try {
        return this.Get(id)
            .then(c => {
                let novoUsuario = estabelecimento.usuario;
                let usuarioID = c.usuario.id;
                novoUsuario.id = null;

                // console.log(usuarioID, novoUsuario);
                return UsuarioService.Edit(usuarioID, novoUsuario)
                    .then(u => {
                        let novoEstabelecimento = estabelecimento;
                        novoEstabelecimento.id = null;
                        novoEstabelecimento.usuarioID = c.usuario.id;
                        novoEstabelecimento.usuario = null;

                        console.log(id, novoEstabelecimento);
                        return refEstabelecimento.child(id)
                            .set(novoEstabelecimento)
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
                        return refEstabelecimento.child(id).remove();
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