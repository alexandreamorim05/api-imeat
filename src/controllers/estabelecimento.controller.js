require('dotenv').config();
const httpStatus = require('http-status-codes');

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O CLIENTE
const { responseJson, responseErrorJson } = require('../utils/controller');

// IMPORTANDO O MODEL DE USUÁRIO.
const EstabelecimentoModel = require('../models/estabelecimento.model.js');

// IMPORTANDO O MODULO DE SERVICO DO USUÁRIO, ONDE TERÃO OS MÉTODS QUE TERÁ LIGAÇÃO DIRETA COM O BANCO DE DADOS
const EstabelecimentoService = require('../services/estabelecimento.service.js');

// MÉTODO QUE BUSCA TODOS CLIENTES
const getAll = (req, res) => {
    try {
        EstabelecimentoService.GetAll()
            .then((data) => {
                responseJson(res, 'Buscando todos os estabelecimentos', data, httpStatus.OK);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO QUE BUSCA O CLIENTE POR ID
const get = (req, res) => {
    try {
        let idEstabelecimento = req.params.id;
        EstabelecimentoService.Get(idEstabelecimento)
            .then((data) => {
                if (data) {
                    responseJson(res, 'Buscando estabelecimento por ID', data, httpStatus.OK);
                } else {
                    responseJson(res, 'Estabelecimento não encontrado', null, httpStatus.NOT_FOUND);
                }
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

const getLista = (req, res) => {
    try {
        EstabelecimentoService.GetLista()
            .then((data) => {
                responseJson(res, 'Buscando lista dos estabelecimentos', data, httpStatus.OK);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO RESPONSA´VEL POR CRIAR UM NOVO CLIENTE
const post = (req, res) => {

    try {

        let estabelecimento = new EstabelecimentoModel();
        estabelecimento.serialize(req.body);

        EstabelecimentoService.Create(estabelecimento)
            .then((e) => {
                //console.log(u);
                responseJson(res, 'Estabelecimento inserido', e, httpStatus.OK);
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

const setCardapio = (req, res) => {
    try {
        let idEstabelecimento = req.params.id;
        let data = req.body;

        EstabelecimentoService.GravarCardapio(idEstabelecimento, data)
            .then(() => {
                responseJson(res, 'Cardapio adicionado com sucesso', null, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });
    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const getCardapio = (req, res) => {
    try {
        let idEstabelecimento = req.params.id;
        EstabelecimentoService.BuscarCardapio(idEstabelecimento)
            .then((data) => {
                responseJson(res, 'Cardapio buscado com sucesso', data, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO RESPONSÁVEL POR EDITAR OS DADOS DO CLIENTE
const put = (req, res) => {

    try {

        // é necessário editar o usuário primeiramente.
        let idEstabelecimento = req.params.id;
        let estabelecimento = new EstabelecimentoModel();
        estabelecimento.serialize(req.body);

        EstabelecimentoService.Edit(idEstabelecimento, estabelecimento)
            .then((c) => {
                responseJson(res, 'Estabelecimento editado com sucesso', c, httpStatus.OK);
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
        let idEstabelecimento = req.params.id;

        EstabelecimentoService.Remove(idEstabelecimento)
            .then(() => {
                responseJson(res, 'Estabelecimento removido com sucesso', null, httpStatus.OK);
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
    getLista,
    post,
    setCardapio,
    getCardapio,
    put,
    remove
}