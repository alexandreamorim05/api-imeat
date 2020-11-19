const router = require('express').Router();

// IMPORTANDO O CONTROLLER DE USUÁRIO PARA PODER DIRECIONAR CADA CHAMADA PARA SEU RESPECTIVO MÉTODO.
const userController = require('../controllers/usuario.controller');

// MÉTODO QUE VAI VERIFICAR SE O USUÁRIO PASSOU O TOKEN PARA REALIZAR ALGUMAS AÇÕES
const login = require('../middleware/login');

router.get('/', userController.getAll);

router.get('/:id', userController.get);

router.post('/', userController.post);

router.put('/:id', userController.put);

router.delete('/:id', userController.remove);

router.post('/login', userController.login);

module.exports = router;