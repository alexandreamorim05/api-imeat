require('dotenv').config();
const httpStatus = require('http-status-codes');

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O CLIENTE
const { responseJson, responseErrorJson } = require('../utils/controller');

// IMPORTANDO O MODEL DE CLIENTE.
const ClienteModel = require('../models/cliente.model.js');

// IMPORTANDO O MODULO DE SERVICO DO CLIENTE, ONDE TERÃO OS MÉTODS QUE TERÁ LIGAÇÃO DIRETA COM O BANCO DE DADOS
const ClienteService = require('../services/cliente.service.js');

// MÉTODO QUE BUSCA TODOS CLIENTES
const getAll = (req, res) => {
    try {
        ClienteService.GetAll()
            .then((data) => {
                responseJson(res, 'Buscando todos os clientes', data, httpStatus.OK);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO QUE BUSCA O CLIENTE POR ID
const get = (req, res) => {
    try {
        let idCliente = req.params.id;
        ClienteService.Get(idCliente)
            .then((data) => {
                if (data) {
                    responseJson(res, 'Buscando cliente por ID', data, httpStatus.OK);
                } else {
                    responseJson(res, 'Cliente não encontrado', null, httpStatus.NOT_FOUND);
                }
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO QUE RETORNA TODOS OS PEDIDOS DO CLIENTE
const getPedidos = (req, res) => {
    try {
        let idCliente = req.params.id;
        ClienteService.GetPedidos(idCliente)
            .then((data) => {
                if (data) {
                    responseJson(res, 'Buscando pedidos por ID do Cliente', data, httpStatus.OK);
                } else {
                    responseJson(res, 'Pedidos não encontrado', null, httpStatus.NOT_FOUND);
                }
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO RESPONSA´VEL POR CRIAR UM NOVO CLIENTE
const post = (req, res) => {

    try {

        let cliente = new ClienteModel();
        cliente.serialize(req.body);

        ClienteService.Create(cliente)
            .then((c) => {
                //console.log(u);
                responseJson(res, 'Cliente inserido', c, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });

    } catch (error) {
        responseErrorJson(res, error);
    }

    /*
    try {

        let cliente = new ClienteModel();
        cliente.serialize(req.body);

        //console.log(cliente);

        ClienteService.Create(cliente)
            .then(({clienteEncontrado, cadastrado}) => {
                //console.log(clienteEncontrado);
                if (cadastrado) {
                    responseJson(res, 'Cliente já inserido', null, httpStatus.CONFLICT);
                } else {
                    responseJson(res, 'Cliente inserido com sucesso', clienteEncontrado, httpStatus.CREATED);
                }
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });

    } catch (error) {
        responseErrorJson(res, error);
    }
    */
}

// MÉTODO RESPONSÁVEL POR EDITAR OS DADOS DO CLIENTE
const put = (req, res) => {

    try {

        // é necessário editar o usuário primeiramente.
        let idCliente = req.params.id;
        let cliente = new ClienteModel();
        cliente.serialize(req.body);

        ClienteService.Edit(idCliente, cliente)
            .then((c) => {
                responseJson(res, 'Cliente editado com sucesso', c, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });

    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO RESPONSÁVEL POR REMOVER O CLIENTE PELO ID PASSADO
const remove = (req, res) => {
    try {
        let idCliente = req.params.id;

        ClienteService.Remove(idCliente)
            .then(() => {
                responseJson(res, 'Cliente removido com sucesso', null, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });
    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// EXPORTANDO OS MÉTODOS
module.exports = {
    getAll,
    get,
    getPedidos,
    post,
    put,
    remove
}