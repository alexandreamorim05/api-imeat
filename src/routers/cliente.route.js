const router = require('express').Router();

// IMPORTANDO O CONTROLLER DE CLIETNE PARA PODER DIRECIONAR CADA CHAMADA PARA SEU RESPECTIVO MÉTODO.
const clienteController = require('../controllers/cliente.controller');

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.get);
router.get('/:id/pedidos', clienteController.getPedidos);

router.post('/', clienteController.post);

router.put('/:id', clienteController.put);

router.delete('/:id', clienteController.remove);

module.exports = router;