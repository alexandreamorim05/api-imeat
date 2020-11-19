const router = require("express").Router();

// IMPORTANDO O MODULO DE ROTAS DO USUÁRIO.
const userRoute = require("./usuario.route");

// IMPORTANDO AS FUNÇÕES DE RETORNO PARA O USUÁRIO
const { responseJson, responseErrorJson } = require('../utils/controller');

// APLICANDO RETORNO PARA O ENDPOINT 'localhost:5000/api/'
router.get("/", (req, res) => {
    responseJson(res, 'IMEAT API - HOME');
});

// IMPORTANDO PARA O ENDPOINT DE 'localhost:5000/api/usuario' TODAS AÇÕES DO USUÁRIO.ROUTE
router.use("/usuario", userRoute);

// Tratar quando não encontrar o endpoint.
// https://github.com/Maransatto/rest-api-node-js/blob/master/app.js

// EXPORTANDO O MODULO DE ROTAS
module.exports = router;