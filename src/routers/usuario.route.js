const router = require('express').Router();

// IMPORTANDO O CONTROLLER DE USUÁRIO PARA PODER DIRECIONAR CADA CHAMADA PARA SEU RESPECTIVO MÉTODO.
const userController = require('../controllers/usuario.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.get);

router.post('/', userController.post);
router.post('/login', userController.login);

router.put('/:id', userController.put);

router.delete('/:id', userController.remove);

module.exports = router;