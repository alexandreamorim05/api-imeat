require('dotenv').config();
const httpStatus = require('http-status-codes');

// IMPORTANDO O MODULO DO JSAONWEBTOKEN E A CHAVE PARA GERAÇÃO DO TOKEN.
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O USUÁRIO
const { responseJson, responseErrorJson } = require('../utils/controller');

// IMPORTANDO O MODEL DE USUÁRIO.
const UsuarioModel = require('../models/usuario.model.js');

// IMPORTANDO O MODULO DE SERVICO DO USUÁRIO, ONDE TERÃO OS MÉTODS QUE TERÁ LIGAÇÃO DIRETA COM O BANCO DE DADOS
const UsuarioService = require('../services/usuario.service.js');

// MÉTODO QUE BUSCA TODOS USUÁRIOS
const getAll = (req, res) => {
    try {
        UsuarioService.GetAll()
            .then((data) => {
                //console.log(u);
                responseJson(res, 'Usuário encontrado', data, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO QUE BUSCA O USUÁRIO POR ID
const get = (req, res) => {
    try {
        let idUsuario = req.params.id;
        UsuarioService.Get(idUsuario)
            .then((u) => {
                //console.log(u);
                responseJson(res, 'Usuário encontrado', u, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO RESPONSA´VEL POR CRIAR UM NOVO USUÁRIO
const post = (req, res) => {


    try {

        let usuario = new UsuarioModel();
        usuario.serialize(req.body);

        UsuarioService.Create(usuario)
            .then((u) => {
                //console.log(u);
                responseJson(res, 'Usuário inserido', u, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });

    } catch (error) {
        responseErrorJson(res, error);
    }

    /*
    try {

        let usuario = new UsuarioModel();
    usuario.serialize(req.body);

        UsuarioService.Create(usuario)
            .then(({usuarioInserido, cadastrado}) => {
                if (cadastrado) {
                    responseJson(res, 'Usuário já inserido', null, httpStatus.CONFLICT);
                } else {
                    responseJson(res, 'Usuário inserido com sucesso', usuarioInserido, httpStatus.CREATED);
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

// MÉTODO RESPONSÁVEL POR EDITAR OS DADOS DOUSUÁRIO
const put = (req, res) => {

    try {

        let idUsuario = req.params.id;
        let usuario = new UsuarioModel();
        usuario.serialize(req.body);

        UsuarioService.Edit(idUsuario, usuario)
            .then((u) => {
                //console.log(u);
                responseJson(res, 'Usuário Editado', u, httpStatus.OK);
            })
            .catch((error) => {
                responseErrorJson(res, error);
            });

    } catch (error) {
        responseErrorJson(res, error);
    }
    /*
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
                responseErrorJson(res, error);
            });

    } catch (error) {
        responseErrorJson(res, error);
    }
    */
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
                responseErrorJson(res, error);
            });
    } catch (error) {
        responseErrorJson(res, error);
    }
}

// MÉTODO RESPONSÁVEL POR REALIZAR O LOGIN
const login = (req, res) => {

    // 
    try {

        // GERANDO O TOKEN DE AUTENTICAÇÃO 
        let token = jwt.sign({
            id_usuario: 0,
            email: '',
        }, JWT_KEY, {
            expiresIn: "1h",
        });

        // PEGANDO O EMAIL E A SENHA DA REQUISIÇÃO
        let { email, senha, tipoUsuario } = req.body;

        UsuarioService.Login(email, senha, tipoUsuario)
            .then(usuarioAutenticado => {

                // SE DEVOLVER UM OBJETO DE USUÁRIO SIGNIFICA QUE FOI ENCONTRADO NA BASE,
                // SENDO ASSIM, MONTA UM OBJETO DE RESPOSTA COM O TOKEN GERADO ACIMA
                if (usuarioAutenticado) {
                    UsuarioService.GetDados(usuarioAutenticado.id, tipoUsuario)
                        .then(dados => {
                            
                            let data = {
                                token: token,
                                tipoUsuario: tipoUsuario,
                                data: dados
                            }
                            responseJson(res, 'Usuário autenticado com sucesso', data, httpStatus.OK);
                        })
                        .catch((error) => {
                            responseJson(res, 'Usuário não autenticado', error, httpStatus.UNAUTHORIZED);
                        })

                } else {
                    responseJson(res, 'Usuário não autenticado', null, httpStatus.UNAUTHORIZED);
                }
            });

    } catch (error) {
        responseErrorJson(res, error);
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