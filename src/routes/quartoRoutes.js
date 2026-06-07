const express = require('express');
const router = express.Router();
const quartoController = require('../controllers/quartoController');
const verificarAutenticacao = require('../middLewares/authMiddLeware');

router.get('/quartos', verificarAutenticacao, quartoController.listar);
router.get('/quartos/novo', verificarAutenticacao, quartoController.telaNovo);
router.post('/quartos/novo', verificarAutenticacao, quartoController.salvar);
router.get('/quartos/editar/:id', verificarAutenticacao, quartoController.telaEditar);
router.post('/quartos/editar/:id', verificarAutenticacao, quartoController.atualizar);
router.get('/quartos/excluir/:id', verificarAutenticacao, quartoController.excluir);

module.exports = router;