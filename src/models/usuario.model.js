const UsuarioService = require('../services/usuario.service');

class UsuarioModel {
    id;
    email;
    senha;
    tipoUsuario;

    // Esse método foi construído para resolver o problema, quando a chave vem com valor undefined.
    serialize(jsonBody) {
        this.id = jsonBody.id || null;
        this.email = jsonBody.email || null;
        this.senha = UsuarioService.CriptografarSenha(jsonBody.senha) || null;        
        this.tipoUsuario = jsonBody.tipoUsuario || null;
    }
}

module.exports = UsuarioModel;