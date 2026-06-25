const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const authRoutes = require('./src/routes/authRoutes');
const hospedeRoutes = require('./src/routes/hospedeRoutes');
const quartoRoutes = require('./src/routes/quartoRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');
const apiRoutes = require('./src/routes/apiRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'hotel_twister_secret_token_key',
    resave: false,
    saveUninitialized: false
}));

// Rotas do navegador (EJS)
app.use(authRoutes);
app.use(hospedeRoutes);
app.use(quartoRoutes);
app.use(reservaRoutes);

// Rotas da API (Postman) - prefixo /api
app.use(apiRoutes);

app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
    console.log('🌐 Navegador: http://localhost:3000/login');
    console.log('📮 Postman:   POST http://localhost:3000/api/login');
});
