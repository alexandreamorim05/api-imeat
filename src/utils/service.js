const TratarVetor = (snapshot) => {
    let data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });
    return data;
};

const TratarObjeto = (snapshot, id) => {
    return {id, ...snapshot.val()};
};

module.exports = {
    TratarVetor,
    TratarObjeto
}