const router = require('express').Router();

// IMPORTANDO O CONTROLLER DE CLIETNE PARA PODER DIRECIONAR CADA CHAMADA PARA SEU RESPECTIVO MÉTODO.
const PedidoController = require('../controllers/pedido.controller');

router.get('/', PedidoController.getAll);
router.get('/:id', PedidoController.get);

router.post('/', PedidoController.post);

router.put('/:id', PedidoController.put);

router.delete('/:id', PedidoController.remove);

module.exports = router;