const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificarAutenticacao = require('../middLewares/authMiddLeware');

router.get('/login', authController.telaLogin);
router.post('/login', authController.processarLogin);
router.get('/logout', authController.logout);

router.get('/dashboard', verificarAutenticacao, (req, res) => {
    res.render('dashboard', { usuario: req.session.usuarioLogado });
});

router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;