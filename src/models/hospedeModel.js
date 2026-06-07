const pool = require('../config/database');

const Hospede = {
    listarTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM hospede');
        return rows;
    },
    buscarPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM hospede WHERE id_hospede = ?', [id]);
        return rows[0];
    },
    cadastrar: async (dados) => {
        const { nome, cpf, email, telefone } = dados;
        return await pool.execute(
            'INSERT INTO hospede (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)',
            [nome, cpf, email, telefone]
        );
    },
    atualizar: async (id, dados) => {
        const { nome, cpf, email, telefone } = dados;
        return await pool.execute(
            'UPDATE hospede SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id_hospede = ?',
            [nome, cpf, email, telefone, id]
        );
    },
    excluir: async (id) => {
        return await pool.execute('DELETE FROM hospede WHERE id_hospede = ?', [id]);
    }
};

module.exports = Hospede;