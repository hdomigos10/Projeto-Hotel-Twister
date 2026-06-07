const Quarto = require('../models/quartoModel');

exports.listar = async (req, res) => {
    try {
        const quartos = await Quarto.listarTodos();
        res.render('quartos/index', { quartos, erro: req.query.erro || null });
    } catch (error) {
        res.status(500).send('Erro ao buscar quartos.');
    }
};

exports.telaNovo = (req, res) => res.render('quartos/novo');

exports.salvar = async (req, res) => {
    try {
        await Quarto.cadastrar(req.body);
        res.redirect('/quartos');
    } catch (error) {
        res.status(500).send('Erro ao inserir quarto.');
    }
};

exports.telaEditar = async (req, res) => {
    try {
        const quarto = await Quarto.buscarPorId(req.params.id);
        if (!quarto) return res.status(404).send('Quarto não localizado.');
        res.render('quartos/editar', { quarto });
    } catch (error) {
        res.status(500).send('Erro ao abrir edição.');
    }
};

exports.atualizar = async (req, res) => {
    try {
        await Quarto.atualizar(req.params.id, req.body);
        res.redirect('/quartos');
    } catch (error) {
        res.status(500).send('Erro ao modificar quarto.');
    }
};

exports.excluir = async (req, res) => {
    try {
        await Quarto.excluir(req.params.id);
        res.redirect('/quartos');
    } catch (error) {
        res.redirect('/quartos?erro=quarto_vinculado');
    }
};