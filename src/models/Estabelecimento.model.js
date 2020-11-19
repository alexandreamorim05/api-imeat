class EstabelecimentoModel {
    nome;
    cpnj;
    rua;
    bairro;
    numero;
    cidade;
    estado;
    complemento;
    cep;

    serialize(jsonBody) {
        this.nome = jsonBody.nome || null;
        this.cnpj = jsonBody.cnpj || null;
        this.rua = jsonBody.rua || null;
        this.bairro = jsonBody.bairro || null;
        this.numero = jsonBody.numero || null;
        this.cidade = jsonBody.cidade || null;
        this.estado = jsonBody.estado || null;
        this.complemento = jsonBody.complemento || null;
        this.cep = jsonBody.cep || null;
    }
}

module.exports = EstabelecimentoModel;