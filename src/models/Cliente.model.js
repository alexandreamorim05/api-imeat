const UsuarioModel = require('./usuario.model');

class ClienteModel {
    id;
    nome;
    sobrenome;
    rua;
    bairro;
    numero;
    cidade;
    estado;
    complemento;
    cep;
    usuario;

    serialize(jsonBody) {
        this.id = jsonBody.id || null;
        this.nome = jsonBody.nome || null;
        this.sobrenome = jsonBody.sobrenome || null;
        this.rua = jsonBody.rua || null;
        this.bairro = jsonBody.bairro || null;
        this.numero = jsonBody.numero || null;
        this.cidade = jsonBody.cidade || null;
        this.estado = jsonBody.estado || null;
        this.complemento = jsonBody.complemento || null;
        this.cep = jsonBody.cep || null;
        this.usuarioId = jsonBody.usuarioId || null;

        
        // CRIANDO O USUÁRIO
        if (!jsonBody.usuario) {
            this.usuario = null;
        } else {
            let usuario = new UsuarioModel();
            usuario.serialize(jsonBody.usuario);
            this.usuario = usuario;
        }
        

    }
}

module.exports = ClienteModel;