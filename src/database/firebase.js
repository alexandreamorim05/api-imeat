const firebase = require('firebase');

var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

module.exports.Create = (tabela, objeto) => {
    return firebase.database().ref(tabela)
        .push(objeto)
        .then(function (data) {
            return data.key;
        })
        .catch(function (error) {
            console.log('Synchronization failed');
        });
}

module.exports.Edit = (tabela, objeto, id) => {
    return firebase.database().ref(`${tabela}/${id}`)
        .set(objeto)
        .then(function (objeto) {
            console.log('Synchronization succeeded');
            return objeto;
        })
        .catch(function (error) {
            console.log('Synchronization failed');
        });
}

module.exports.Remove = (tabela, id) =>{
    return firebase.database().ref(`${tabela}/${id}`)
        .remove()
        .then(function () {
            console.log('Synchronization succeeded');
        })
        .catch(function (error) {
            console.log('Synchronization failed');
        });
} 

module.exports.GetData = (tabela, id) => {
    let data = []
    return firebase.database().ref(tabela).once('value')
        .then((snapshot) => {

            snapshot.forEach((childSnapshot) => {
                data.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            function filterData(tupla) {
                if (!id) {
                    return true;
                }
                return tupla.id === id;
            }

            data = data.filter(filterData);
            
            if (id) {
                console.log(data);
                return data[0];
            }

            return data;
            
        });
}

return module.exports