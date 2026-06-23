const pool = require('../config/database');

const Reserva = {
    listarTodas: async () => {
        const query = `
            SELECT r.*, h.nome AS hospede_nome, q.numero AS quarto_numero 
            FROM reserva r
            JOIN hospede h ON r.id_hospede = h.id_hospede
            JOIN quarto q ON r.id_quarto = q.id_quarto
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },
    cadastrar: async (dados) => {
        const { id_hospede, id_quarto, data_entrada, data_saida, valor_total } = dados;
        const [result] = await pool.execute(
            'INSERT INTO reserva (id_hospede, id_quarto, data_entrada, data_saida, valor_total) VALUES (?, ?, ?, ?, ?)',
            [id_hospede, id_quarto, data_entrada, data_saida, valor_total]
        );
       
        await pool.execute('UPDATE quarto SET status = "Ocupado" WHERE id_quarto = ?', [id_quarto]);
        return result;
    },
    buscarPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM reserva WHERE id_reserva = ?', [id]);
        return rows[0];
    },
    atualizar: async (id, dados) => {
        const { id_hospede, id_quarto, data_entrada, data_saida, valor_total } = dados;

        const [rows] = await pool.execute('SELECT id_quarto FROM reserva WHERE id_reserva = ?', [id]);
        if (rows.length === 0) {
            throw new Error('Reserva não encontrada.');
        }
        const idQuartoAntigo = rows[0].id_quarto;

        // Se o quarto foi trocado, libera o quarto antigo e ocupa o novo
        if (Number(idQuartoAntigo) !== Number(id_quarto)) {
            await pool.execute('UPDATE quarto SET status = "Disponível" WHERE id_quarto = ?', [idQuartoAntigo]);
            await pool.execute('UPDATE quarto SET status = "Ocupado" WHERE id_quarto = ?', [id_quarto]);
        }

        return await pool.execute(
            'UPDATE reserva SET id_hospede = ?, id_quarto = ?, data_entrada = ?, data_saida = ?, valor_total = ? WHERE id_reserva = ?',
            [id_hospede, id_quarto, data_entrada, data_saida, valor_total, id]
        );
    },
    excluir: async (id) => {
        const [rows] = await pool.execute('SELECT id_quarto FROM reserva WHERE id_reserva = ?', [id]);
        if (rows.length > 0) {
            
            await pool.execute('UPDATE quarto SET status = "Disponível" WHERE id_quarto = ?', [rows[0].id_quarto]);
        }
        return await pool.execute('DELETE FROM reserva WHERE id_reserva = ?', [id]);
    }
};

module.exports = Reserva;