const router = require("express").Router();

// IMPORTANDO O MODULO DE ROTAS DO USUÁRIO.
const userRoute = require("./usuario.route");

// IMPORTANDO O MODULO DE ROTAS DO CLIENTE.
const clienteRoute = require("./cliente.route");

// IMPORTANDO O MODULO DE ROTAS DO CLIENTE.
const estabelecimentoRoute = require("./estabelecimento.route");

// IMPORTANDO O MODULO DE ROTAS DO PEDIDO.
const pedidoRoute = require("./pedido.route");

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O USUÁRIO
const { responseJson, responseErrorJson } = require('../utils/controller');

// APLICANDO RETORNO PARA O ENDPOINT 'localhost:5000/api/'
router.get("/", (req, res) => {
    responseJson(res, 'IMEAT API - HOME');
});

// IMPORTANDO PARA O ENDPOINT DE 'localhost:5000/api/usuario' TODAS AÇÕES DO USUÁRIO.ROUTE
router.use("/usuario", userRoute);

// IMPORTANDO PARA O ENDPOINT DE 'localhost:5000/api/cliente' TODAS AÇÕES DO CLIENTE.ROUTE
router.use("/cliente", clienteRoute);

// IMPORTANDO PARA O ENDPOINT DE 'localhost:5000/api/estabelecimento' TODAS AÇÕES DO Estabelecimento.ROUTE
router.use("/estabelecimento", estabelecimentoRoute);

// IMPORTANDO PARA O ENDPOINT DE 'localhost:5000/api/pedido' TODAS AÇÕES DO PEDIDO.ROUTE
router.use("/pedido", pedidoRoute);

// Tratar quando não encontrar o endpoint.
// https://github.com/Maransatto/rest-api-node-js/blob/master/app.js

// EXPORTANDO O MODULO DE ROTAS
module.exports = router;