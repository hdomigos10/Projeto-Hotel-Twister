USE hotel_twister;

INSERT INTO usuario (nome, email, senha_hash) 
VALUES ('Administrador Twister', 'admin@hotel.com', '$2b$10$dAPKQXI/pqWDvnmRj5XuVu4d0ETkAz7CL/JiZTQp6TrpLT1qlvxZe')
ON DUPLICATE KEY UPDATE id_usuario=id_usuario;

INSERT INTO hospede (nome, cpf, email, telefone) VALUES 
('Higor Domingos', '111.222.333-44', 'higor@email.com', '(43) 99999-1111'),
('João Pedro', '222.333.444-55', 'joao@email.com', '(43) 99999-2222')
ON DUPLICATE KEY UPDATE id_hospede=id_hospede;

INSERT INTO quarto (numero, tipo, preco_diaria, status) VALUES 
('101', 'Standard', 140.00, 'Disponível'),
('102', 'Master VIP', 290.00, 'Disponível')
ON DUPLICATE KEY UPDATE id_quarto=id_quarto;