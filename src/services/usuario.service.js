const bcrypt = require('bcrypt');
const Tabelas = require('../database/tabelas.js');

const conFirebase = require("../database/firebase.js");
const database = conFirebase.database();
const refUsuario = database.ref('usuarios');

const { TratarVetor, TratarObjeto } = require('../utils/service');

const ClienteService = require('../services/cliente.service.js');
const EstabelecimentoService = require('../services/estabelecimento.service.js');

// CRIPTOGRAFANDO A SENHA.
module.exports.CriptografarSenha = (senha) => {
    if (!senha) {
        return null;
    }

    return bcrypt.hashSync(senha, 10);
}

// MÉTODO QUE BUSCA USUARIO POR ID
module.exports.Get = async (id) => {
    try {
        return refUsuario.child(id).once('value')
            .then(snapshot => {
                return TratarObjeto(snapshot, id);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE BUSCA TODOS OS USUÁRIOS
module.exports.GetAll = () => {

    try {
        return refUsuario.once('value')
            .then(snapshot => {
                return TratarVetor(snapshot);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE BUSCA O USUÁRIO POR EMAIL
module.exports.GetByEmail = (email) => {

    try {
        return this.GetAll()
            .then(data => {
                let usuario = data.filter(u => u.email == email)[0]
                return Promise.resolve(usuario);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE CRIA O USUÁRIO
module.exports.Create = async (usuario) => {

    try {
        let autoId = refUsuario.push().key;

        return refUsuario.child(autoId)
            .set(usuario)
            .then(() => {
                return this.Get(autoId);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE EDITA OS DADOS DO USUÁRIO
module.exports.Edit = (id, usuario) => {

    try {
        return refUsuario.child(id)
            .update(usuario)
            .then(() => {
                return this.Get(id);
            });
    } catch (error) {
        console.log(error);
    }
}

// MÉTODO QUE REMOVE O USUÁRIO POR ID
module.exports.Remove = (id) => {

    try {
        return refUsuario.child(id).remove();
    } catch (error) {
        console.log(error);
    }

}

module.exports.GetDados = (idUsuario, tipoUsuario) => {

    try {
        if (tipoUsuario == 'C') {
            return ClienteService.GetAll()
                .then(clientes => {
                    return clientes.filter(c => c.usuario.id == idUsuario)[0];
                });
        } else {
            return EstabelecimentoService.GetAll()
                .then(estabelecimentos => {
                    return estabelecimentos.filter(e => e.usuario.id == idUsuario)[0];
                });
        }

    } catch (error) {
        console.log(error);
    }

}


// MÉTODO QUE REALIZA O LOGIN DO USUÁRIO.
module.exports.Login = (email, senha, tipoUsuario) => {

    try {
        return refUsuario
            .orderByChild('email').equalTo(email)
            .once('value')
            .then(snapshot => {

                // FUNÇÃO QUE SERÁ CHAMADA NO FILTER.
                function filterLogin(tupla) {
                    return tupla.tipoUsuario == tipoUsuario && bcrypt.compareSync(senha, tupla.senha);
                }

                let data = TratarVetor(snapshot);
                return data.filter(filterLogin)[0];
            });
    } catch (error) {
        console.log(error);
    }


}