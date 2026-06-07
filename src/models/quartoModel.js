const pool = require('../config/database');

const Quarto = {
    listarTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM quarto');
        return rows;
    },
    buscarPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM quarto WHERE id_quarto = ?', [id]);
        return rows[0];
    },
    cadastrar: async (dados) => {
        const { numero, tipo, preco_diaria, status } = dados;
        return await pool.execute(
            'INSERT INTO quarto (numero, tipo, preco_diaria, status) VALUES (?, ?, ?, ?)',
            [numero, tipo, preco_diaria, status]
        );
    },
    atualizar: async (id, dados) => {
        const { numero, tipo, preco_diaria, status } = dados;
        return await pool.execute(
            'UPDATE quarto SET numero = ?, tipo = ?, preco_diaria = ?, status = ? WHERE id_quarto = ?',
            [numero, tipo, preco_diaria, status, id]
        );
    },
    excluir: async (id) => {
        return await pool.execute('DELETE FROM quarto WHERE id_quarto = ?', [id]);
    }
};

module.exports = Quarto;