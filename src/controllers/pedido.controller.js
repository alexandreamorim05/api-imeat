require('dotenv').config();
const httpStatus = require('http-status-codes');

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O Pedido
const { responseJson, responseErrorJson } = require('../utils/controller');

// IMPORTANDO O MODULO DE SERVICO DO USUÁRIO, ONDE TERÃO OS MÉTODS QUE TERÁ LIGAÇÃO DIRETA COM O BANCO DE DADOS
const PedidoService = require('../services/pedido.service.js');

// MÉTODO QUE BUSCA TODOS PEDIDO
const getAll = (req, res) => {
    try {
        PedidoService.GetAll()
            .then((data) => {
                responseJson(res, 'Buscando todos os Pedidos', data, httpStatus.OK);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO QUE BUSCA O PEDIDOS POR ID
const get = (req, res) => {
    try {
        let idCliente = req.params.id;
        PedidoService.Get(idCliente)
            .then((data) => {
                if (data) {
                    responseJson(res, 'Buscando pedido por ID', data, httpStatus.OK);
                } else {
                    responseJson(res, 'Pedido não encontrado', null, httpStatus.NOT_FOUND);
                }
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO RESPONSA´VEL POR CRIAR UM NOVO PEDIDO
const post = (req, res) => {

    try {

        let pedido = req.body;
        //console.log(pedido);
        // let pedido = new PedidoModel();
        // pedido.serialize(req.body);

        PedidoService.Create(pedido)
            .then((c) => {
                //console.log(u);
                responseJson(res, 'Pedido inserido', c, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });

    } catch (error) {
        responseErrorJson(res, error);
    }

}

// MÉTODO RESPONSÁVEL POR EDITAR OS DADOS DO PEDIDO
const put = (req, res) => {

    try {

        let idPedido = req.params.id;
        let pedido = req.body;

        PedidoService.Edit(idPedido, pedido)
            .then((c) => {
                responseJson(res, 'Pedido editado com sucesso', c, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });

    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO RESPONSÁVEL POR REMOVER O PEDIDO PELO ID PASSADO
const remove = (req, res) => {
    try {
        let idPedido = req.params.id;

        PedidoService.Remove(idPedido)
            .then(() => {
                responseJson(res, 'Pedido removido com sucesso', null, httpStatus.OK);
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
    post,
    put,
    remove
}