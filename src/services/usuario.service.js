const bcrypt = require('bcrypt');
const Tabelas = require('../database/tabelas.js');

const conFirebase = require("../database/firebase.js");

// CRIPTOGRAFANDO A SENHA.
module.exports.CriptografarSenha = (senha) => {
    if (!senha) {
        return null;
    }

    return bcrypt.hashSync(senha, 10);
}

// MÉTODO QUE BUSCA USUARIO POR ID
module.exports.Get = async (id) => {

    return conFirebase.GetData(Tabelas.TAB_USUARIO, id);

}

// MÉTODO QUE BUSCA TODOS OS USUÁRIOS
module.exports.GetAll = () => {

    return this.Get();

}

// MÉTODO QUE BUSCA O USUÁRIO POR EMAIL
module.exports.GetByEmail = (email) => {

    return conFirebase.GetData(Tabelas.TAB_USUARIO)
        .then(data => {
            let usuario = data.filter(u => u.email == email)[0]
            return Promise.resolve(usuario);
        });

}

// MÉTODO QUE CRIA O USUÁRIO
module.exports.Create = (usuario) => {
    let email = usuario.email;
    return this.GetByEmail(email)
        .then((usuarioInserido) => {
            if (usuarioInserido) {
                return Promise.resolve(usuarioInserido);
            } else {
                return conFirebase.Create(Tabelas.TAB_USUARIO, usuario)
                    .then(key => {
                        let usuarioRetorno = usuario;
                        usuario.id = key;
                        return Promise.resolve(usuarioRetorno);
                    });
            }
        });
}

// MÉTODO QUE EDITA OS DADOS DO USUÁRIO
module.exports.Edit = (usuario, id) => {

    return conFirebase.Edit(Tabelas.TAB_USUARIO, usuario, id);

}

// MÉTODO QUE REMOVE O USUÁRIO POR ID
module.exports.Remove = (id) => {

    return conFirebase.Remove(Tabelas.TAB_USUARIO, id);

}

// MÉTODO QUE REALIZA O LOGIN DO USUÁRIO.
module.exports.Login = (email, senha) => {

    try {

        // FUNÇÃO QUE SERÁ CHAMADA NO FILTER.
        function filterLogin(tupla) {
            return tupla.email === email && bcrypt.compareSync(senha, tupla.senha);
        }

        return this.GetAll()
            .then(data => {
                let usuarioLogado = data.filter(filterLogin)[0];
                return Promise.resolve(usuarioLogado);
            });

    } catch (error) {
        console.log(error);
    }

}