const UsuarioModel = require('./usuario.model');

class EstabelecimentoModel {
    id;
    nome;
    cnpj;
    rua;
    bairro;
    numero;
    cidade;
    estado;
    complemento;
    cep;

    serialize(jsonBody) {
        this.id = jsonBody.id || null;
        this.nome = jsonBody.nome || null;
        this.cnpj = jsonBody.cnpj || null;
        this.rua = jsonBody.rua || null;
        this.bairro = jsonBody.bairro || null;
        this.numero = jsonBody.numero || null;
        this.cidade = jsonBody.cidade || null;
        this.estado = jsonBody.estado || null;
        this.complemento = jsonBody.complemento || null;
        this.cep = jsonBody.cep || null;

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

module.exports = EstabelecimentoModel;