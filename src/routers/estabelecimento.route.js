const router = require('express').Router();

// IMPORTANDO O CONTROLLER DE CLIETNE PARA PODER DIRECIONAR CADA CHAMADA PARA SEU RESPECTIVO MÉTODO.
const EstabelecimentoController = require('../controllers/estabelecimento.controller');

router.get('/', EstabelecimentoController.getAll);
router.get('/lista', EstabelecimentoController.getLista);
router.get('/:id', EstabelecimentoController.get);
router.get('/cardapio/:id', EstabelecimentoController.getCardapio);

router.post('/', EstabelecimentoController.post);
router.post('/cardapio/:id', EstabelecimentoController.setCardapio);

router.put('/:id', EstabelecimentoController.put);

router.delete('/:id', EstabelecimentoController.remove);

module.exports = router;