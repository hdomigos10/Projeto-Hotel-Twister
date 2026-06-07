const express = require('express');
const router = express.Router();
const hospedeController = require('../controllers/hospedeController');
const verificarAutenticacao = require('../middLewares/authMiddLeware');

router.get('/hospedes', verificarAutenticacao, hospedeController.listar);
router.get('/hospedes/novo', verificarAutenticacao, hospedeController.telaNovo);
router.post('/hospedes/novo', verificarAutenticacao, hospedeController.salvar);
router.get('/hospedes/editar/:id', verificarAutenticacao, hospedeController.telaEditar);
router.post('/hospedes/editar/:id', verificarAutenticacao, hospedeController.atualizar);
router.get('/hospedes/excluir/:id', verificarAutenticacao, hospedeController.excluir);

module.exports = router;