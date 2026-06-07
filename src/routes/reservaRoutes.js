const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const verificarAutenticacao = require('../middLewares/authMiddLeware');

router.get('/reservas', verificarAutenticacao, reservaController.listar);
router.get('/reservas/novo', verificarAutenticacao, reservaController.telaNovo);
router.post('/reservas/novo', verificarAutenticacao, reservaController.salvar);
router.get('/reservas/excluir/:id', verificarAutenticacao, reservaController.excluir);

module.exports = router;