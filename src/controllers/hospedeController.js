const Hospede = require('../models/hospedeModel');

exports.listar = async (req, res) => {
    try {
        const hospedes = await Hospede.listarTodos();
        res.render('hospedes/index', { hospedes, erro: req.query.erro || null });
    } catch (error) {
        res.status(500).send('Erro ao buscar hóspedes.');
    }
};

exports.telaNovo = (req, res) => res.render('hospedes/novo');

exports.salvar = async (req, res) => {
    try {
        await Hospede.cadastrar(req.body);
        res.redirect('/hospedes');
    } catch (error) {
        res.status(500).send('Erro ao salvar hóspede.');
    }
};

exports.telaEditar = async (req, res) => {
    try {
        const hospede = await Hospede.buscarPorId(req.params.id);
        if (!hospede) return res.status(404).send('Hóspede não encontrado.');
        res.render('hospedes/editar', { hospede });
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário.');
    }
};

exports.atualizar = async (req, res) => {
    try {
        await Hospede.atualizar(req.params.id, req.body);
        res.redirect('/hospedes');
    } catch (error) {
        res.status(500).send('Erro ao atualizar dados.');
    }
};

exports.excluir = async (req, res) => {
    try {
        await Hospede.excluir(req.params.id);
        res.redirect('/hospedes');
    } catch (error) {
        
        res.redirect('/hospedes?erro=id_vinculado');
    }
};