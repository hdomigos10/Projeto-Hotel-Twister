const express = require('express');
const router = express.Router();
const Hospede = require('../models/hospedeModel');
const Quarto = require('../models/quartoModel');
const Reserva = require('../models/reservaModel');
const pool = require('../config/database');
const bcrypt = require('bcrypt');

// ─── AUTH ────────────────────────────────────────────────────────────────────

router.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: 'Informe email e senha.' });

    try {
        const [rows] = await pool.execute('SELECT * FROM usuario WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado.' });

        const usuario = rows[0];
        let senhaCorreta = false;
        try { senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash); } catch (e) {}

        if (!senhaCorreta) return res.status(401).json({ erro: 'Senha incorreta.' });

        req.session.usuarioLogado = { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email };
        req.session.save((err) => {
            if (err) return res.status(500).json({ erro: 'Erro ao iniciar sessão.' });
            res.status(200).json({ mensagem: 'Login realizado com sucesso.', usuario: req.session.usuarioLogado });
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro de conexão com o banco.' });
    }
});

router.post('/api/logout', (req, res) => {
    req.session.destroy(() => res.status(200).json({ mensagem: 'Logout realizado com sucesso.' }));
});

// ─── MIDDLEWARE API ───────────────────────────────────────────────────────────

const autenticarAPI = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) return next();
    res.status(401).json({ erro: 'Não autenticado. Faça POST /api/login primeiro.' });
};

// ─── HÓSPEDES ─────────────────────────────────────────────────────────────────

router.get('/api/hospedes', autenticarAPI, async (req, res) => {
    try {
        const hospedes = await Hospede.listarTodos();
        res.status(200).json(hospedes);
    } catch (e) { res.status(500).json({ erro: 'Erro ao buscar hóspedes.' }); }
});

router.get('/api/hospedes/:id', autenticarAPI, async (req, res) => {
    try {
        const hospede = await Hospede.buscarPorId(req.params.id);
        if (!hospede) return res.status(404).json({ erro: 'Hóspede não encontrado.' });
        res.status(200).json(hospede);
    } catch (e) { res.status(500).json({ erro: 'Erro ao buscar hóspede.' }); }
});

router.post('/api/hospedes', autenticarAPI, async (req, res) => {
    try {
        const result = await Hospede.cadastrar(req.body);
        res.status(201).json({ mensagem: 'Hóspede cadastrado com sucesso.', id: result[0].insertId });
    } catch (e) { res.status(500).json({ erro: 'Erro ao cadastrar hóspede.' }); }
});

router.put('/api/hospedes/:id', autenticarAPI, async (req, res) => {
    try {
        const hospede = await Hospede.buscarPorId(req.params.id);
        if (!hospede) return res.status(404).json({ erro: 'Hóspede não encontrado.' });
        await Hospede.atualizar(req.params.id, req.body);
        res.status(200).json({ mensagem: 'Hóspede atualizado com sucesso.' });
    } catch (e) { res.status(500).json({ erro: 'Erro ao atualizar hóspede.' }); }
});

router.delete('/api/hospedes/:id', autenticarAPI, async (req, res) => {
    try {
        const hospede = await Hospede.buscarPorId(req.params.id);
        if (!hospede) return res.status(404).json({ erro: 'Hóspede não encontrado.' });
        await Hospede.excluir(req.params.id);
        res.status(200).json({ mensagem: 'Hóspede excluído com sucesso.' });
    } catch (e) { res.status(409).json({ erro: 'Não é possível excluir: hóspede vinculado a uma reserva.' }); }
});

// ─── QUARTOS ──────────────────────────────────────────────────────────────────

router.get('/api/quartos', autenticarAPI, async (req, res) => {
    try {
        const quartos = await Quarto.listarTodos();
        res.status(200).json(quartos);
    } catch (e) { res.status(500).json({ erro: 'Erro ao buscar quartos.' }); }
});

router.get('/api/quartos/:id', autenticarAPI, async (req, res) => {
    try {
        const quarto = await Quarto.buscarPorId(req.params.id);
        if (!quarto) return res.status(404).json({ erro: 'Quarto não encontrado.' });
        res.status(200).json(quarto);
    } catch (e) { res.status(500).json({ erro: 'Erro ao buscar quarto.' }); }
});

router.post('/api/quartos', autenticarAPI, async (req, res) => {
    try {
        const result = await Quarto.cadastrar(req.body);
        res.status(201).json({ mensagem: 'Quarto cadastrado com sucesso.', id: result[0].insertId });
    } catch (e) { res.status(500).json({ erro: 'Erro ao cadastrar quarto.' }); }
});

router.put('/api/quartos/:id', autenticarAPI, async (req, res) => {
    try {
        const quarto = await Quarto.buscarPorId(req.params.id);
        if (!quarto) return res.status(404).json({ erro: 'Quarto não encontrado.' });
        await Quarto.atualizar(req.params.id, req.body);
        res.status(200).json({ mensagem: 'Quarto atualizado com sucesso.' });
    } catch (e) { res.status(500).json({ erro: 'Erro ao atualizar quarto.' }); }
});

router.delete('/api/quartos/:id', autenticarAPI, async (req, res) => {
    try {
        const quarto = await Quarto.buscarPorId(req.params.id);
        if (!quarto) return res.status(404).json({ erro: 'Quarto não encontrado.' });
        await Quarto.excluir(req.params.id);
        res.status(200).json({ mensagem: 'Quarto excluído com sucesso.' });
    } catch (e) { res.status(409).json({ erro: 'Não é possível excluir: quarto vinculado a uma reserva.' }); }
});

// ─── RESERVAS ─────────────────────────────────────────────────────────────────

router.get('/api/reservas', autenticarAPI, async (req, res) => {
    try {
        const reservas = await Reserva.listarTodas();
        res.status(200).json(reservas);
    } catch (e) { res.status(500).json({ erro: 'Erro ao buscar reservas.' }); }
});

router.get('/api/reservas/:id', autenticarAPI, async (req, res) => {
    try {
        const reserva = await Reserva.buscarPorId(req.params.id);
        if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada.' });
        res.status(200).json(reserva);
    } catch (e) { res.status(500).json({ erro: 'Erro ao buscar reserva.' }); }
});

router.post('/api/reservas', autenticarAPI, async (req, res) => {
    try {
        const result = await Reserva.cadastrar(req.body);
        res.status(201).json({ mensagem: 'Reserva cadastrada com sucesso.', id: result.insertId });
    } catch (e) {
        console.error('ERRO RESERVA:', e);
        res.status(500).json({ erro: 'Erro ao cadastrar reserva.', detalhe: e.message });
    }
});

router.put('/api/reservas/:id', autenticarAPI, async (req, res) => {
    try {
        const reserva = await Reserva.buscarPorId(req.params.id);
        if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada.' });
        await Reserva.atualizar(req.params.id, req.body);
        res.status(200).json({ mensagem: 'Reserva atualizada com sucesso.' });
    } catch (e) { res.status(500).json({ erro: 'Erro ao atualizar reserva.' }); }
});

router.delete('/api/reservas/:id', autenticarAPI, async (req, res) => {
    try {
        const reserva = await Reserva.buscarPorId(req.params.id);
        if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada.' });
        await Reserva.excluir(req.params.id);
        res.status(200).json({ mensagem: 'Reserva excluída com sucesso.' });
    } catch (e) { res.status(500).json({ erro: 'Erro ao excluir reserva.' }); }
});

module.exports = router;
