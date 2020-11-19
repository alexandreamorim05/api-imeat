class ClienteModel {
    nome;
    sobrenome;
    rua;
    bairro;
    numero;
    cidade;
    estado;
    complemento;
    cep;

    serialize(jsonBody) {
        this.nome = jsonBody.nome || null;
        this.sobrenome = jsonBody.sobrenome || null;
        this.rua = jsonBody.rua || null;
        this.bairro = jsonBody.bairro || null;
        this.numero = jsonBody.numero || null;
        this.cidade = jsonBody.cidade || null;
        this.estado = jsonBody.estado || null;
        this.complemento = jsonBody.complemento || null;
        this.cep = jsonBody.cep || null;
    }
}

module.exports = ClienteModel;