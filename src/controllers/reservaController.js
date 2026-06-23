const Reserva = require('../models/reservaModel');
const Hospede = require('../models/hospedeModel');
const Quarto = require('../models/quartoModel');

exports.listar = async (req, res) => {
    try {
        const reservas = await Reserva.listarTodas();
        res.render('reservas/index', { reservas });
    } catch (error) {
        res.status(500).send('Erro ao expor reservas.');
    }
};

exports.telaNovo = async (req, res) => {
    try {
        const hospedes = await Hospede.listarTodos();
        const quartos = await Quarto.listarTodos();
        const disponiveis = quartos.filter(q => q.status === 'Disponível');
        res.render('reservas/novo', { hospedes, quartos: disponiveis });
    } catch (error) {
        res.status(500).send('Erro ao carregar seletores da reserva.');
    }
};

exports.salvar = async (req, res) => {
    try {
        await Reserva.cadastrar(req.body);
        res.redirect('/reservas');
    } catch (error) {
        res.status(500).send('Erro ao persistir reserva.');
    }
};

exports.telaEditar = async (req, res) => {
    try {
        const reserva = await Reserva.buscarPorId(req.params.id);
        if (!reserva) return res.status(404).send('Reserva não encontrada.');

        const hospedes = await Hospede.listarTodos();
        const todosQuartos = await Quarto.listarTodos();
        // Mantém na lista os quartos livres + o quarto já vinculado a esta reserva
        const quartos = todosQuartos.filter(q => q.status === 'Disponível' || q.id_quarto === reserva.id_quarto);

        res.render('reservas/editar', { reserva, hospedes, quartos });
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição.');
    }
};

exports.atualizar = async (req, res) => {
    try {
        await Reserva.atualizar(req.params.id, req.body);
        res.redirect('/reservas');
    } catch (error) {
        res.status(500).send('Erro ao atualizar reserva.');
    }
};

exports.excluir = async (req, res) => {
    try {
        await Reserva.excluir(req.params.id);
        res.redirect('/reservas');
    } catch (error) {
        res.status(500).send('Erro ao deletar reserva.');
    }
};