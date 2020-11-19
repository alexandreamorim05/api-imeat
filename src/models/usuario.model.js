const ClienteModel = require('./Cliente.model');
const UsuarioService = require('../services/usuario.service');

class UsuarioModel {
    id;
    email;
    senha;
    tipoUsuario;
    cliente;
    estabelecimento;

    // Esse método foi construído para resolver o problema, quando a chave vem com valor undefined.
    serialize(jsonBody) {
        this.id = jsonBody.id || null;
        this.email = jsonBody.email || null;
        this.senha = UsuarioService.CriptografarSenha(jsonBody.senha) || null;        
        this.tipoUsuario = jsonBody.tipoUsuario || null;

        if (!jsonBody.cliente) {
            this.cliente = null;
        } else {
            let cliente = new ClienteModel();
            cliente.serialize(jsonBody.cliente);
            this.cliente = cliente;
        }

        if (!jsonBody.estabelecimento) {
            this.estabelecimento = null;
        } else {
            let estabelecimento = new EstabelecimentoModel();
            estabelecimento.serialize(jsonBody.estabelecimento);
            this.estabelecimento = estabelecimento;
        }

    }
}

module.exports = UsuarioModel;