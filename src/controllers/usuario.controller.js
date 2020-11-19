require('dotenv').config();
const httpStatus = require('http-status-codes');

// IMPORTANDO O MODULO DO JSAONWEBTOKEN E A CHAVE PARA GERAÇÃO DO TOKEN.
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O USUÁRIO
const { responseJson, responseErrorJson } = require('../utils/controller');

// IMPORTANDO AS CONSTANTS DE TABELA. NOME DA TABELA NO BANCO DE DADOS
const Tabelas = require('../database/tabelas.js');

// IMPORTANDO O MODEL DE USUÁRIO.
const UsuarioModel = require('../models/usuario.model.js');

// IMPORTANDO O MODULO DE SERVICO DO USUÁRIO, ONDE TERÃO OS MÉTODS QUE TERÁ LIGAÇÃO DIRETA COM O BANCO DE DADOS
const UsuarioService = require('../services/usuario.service.js');

// MÉTODO QUE BUSCA TODOS USUÁRIOS
const getAll = (req, res) => {
    try {
        UsuarioService.GetAll()
            .then((data) => {
                responseJson(res, 'Buscando todos os usuários', data, httpStatus.OK);
            });
    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO QUE BUSCA O USUÁRIO POR ID
const get = (req, res) => {
    try {
        let idUsuario = req.params.id;
        UsuarioService.Get(idUsuario)
            .then((data) => {
                if (data) {
                    responseJson(res, 'Buscando usuário por ID', data, httpStatus.OK);
                } else {
                    responseJson(res, 'Usuário não encontrado', null, httpStatus.NOT_FOUND);
                }
            });
    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO RESPONSA´VEL POR CRIAR UM NOVO USUÁRIO
const post = (req, res) => {
    try {

        let usuario = new UsuarioModel();
        usuario.serialize(req.body);

        UsuarioService.Create(usuario)
            .then((usuarioInserido) => {
                responseJson(res, 'Usuário inserido com sucesso', usuarioInserido, httpStatus.CREATED);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });

    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO RESPONSÁVEL POR EDITAR OS DADOS DOUSUÁRIO
const put = (req, res) => {
    try {
        let idUsuario = req.params.id;
        let usuario = new UsuarioModel();
        usuario.serialize(req.body);

        UsuarioService.Edit(usuario, idUsuario)
            .then(() => {
                UsuarioService.Get(idUsuario)
                    .then((usuario) => {
                        responseJson(res, 'Usuário editado com sucesso', usuario, httpStatus.OK);
                    });
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });

    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO RESPONSÁVEL POR REMOVER O USUÁRIO PELO ID PASSADO
const remove = (req, res) => {
    try {
        let idUsuario = req.params.id;

        UsuarioService.Remove(idUsuario)
            .then(() => {
                responseJson(res, 'Usuário removido com sucesso', null, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
            });
    } catch (error) {
        responseErrorJson(res, error, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

// MÉTODO RESPONSÁVEL POR REALIZAR O LOGIN
const login = (req, res) => {
    try {
        
        // GERANDO O TOKEN DE AUTENTICAÇÃO 
        let token = jwt.sign({
            id_usuario: 0,
            email: '',
        }, JWT_KEY, {
            expiresIn: "1h",
        });

        // PEGANDO O EMAIL E A SENHA DA REQUISIÇÃO
        let { email, senha } = req.body;

        UsuarioService.Login(email, senha)
            .then(usuarioAutenticado => {
                
                // SE DEVOLVER UM OBJETO DE USUÁRIO SIGNIFICA QUE FOI ENCONTRADO NA BASE,
                // SENDO ASSIM, MONTA UM OBJETO DE RESPOSTA COM O TOKEN GERADO ACIMA
                if (usuarioAutenticado) {
                    let data = {
                        token: token,
                        idUsuario: usuarioAutenticado.id,
                        emailUsuario: usuarioAutenticado.email,
                        nomeUsuario: (usuarioAutenticado.tipoUsuario == 'C') ?
                            usuarioAutenticado.cliente.nome : usuarioAutenticado.estabelecimento.nome,
                    }
                    responseJson(res, 'Usuário autenticado com sucesso', data, httpStatus.OK);
                } else {
                    responseJson(res, 'Usuário não autenticado', null, httpStatus.UNAUTHORIZED);
                }
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
    remove,
    login,
}