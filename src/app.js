const express = require('express');
const cors = require('cors');
const app = express();

// CHAMDNO O MODULO DE ROTAS
const rotasAPI = require("./routers/index");

const bodyParser = require('body-parser');

// DEFININDO OS RETORNOS COMO JSON E IMPLEMENTANDO O BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ADICIONANDO OS CORS PARA NÃO TER PROBLEMAS DE REQUISIÇÃO QUANDO A API ESTIVER HOSPEDADA.
app.use(cors());

// ADICIONANDO AS ROTAS DA APLICAÇÃO.
app.use("/api", rotasAPI);

// EXPORTANDO O MODULO APP
module.exports = app;