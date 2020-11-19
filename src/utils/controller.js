const httpStatus = require('http-status-codes');

// MÉTODO CONSTRUÍDO PARA RETORNAR A RESPOSTA DE SUCESSO
const responseJson = (res, msgSuccess, data, statusCode = httpStatus.OK) => {
    res.status(statusCode);
    if (!data) {
        return res.json({msg: msgSuccess});    
    }
    return res.json(data);
};

// MÉTODO CONSTRUÍDO PARA RETORNAR A RESPOSATA DE ERRO.
const responseErrorJson = (res, msgError, statusCode = httpStatus.INTERNAL_SERVER_ERROR) => {
    res.status(statusCode);
    return res.json({
        msg: msgError || '',
    });
};

// EXPORTANDO OS MÉTODOS
module.exports = {
    responseErrorJson,
    responseJson,
};