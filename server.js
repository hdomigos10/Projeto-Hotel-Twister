const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const authRoutes = require('./src/routes/authRoutes');
const hospedeRoutes = require('./src/routes/hospedeRoutes');
const quartoRoutes = require('./src/routes/quartoRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'hotel_twister_secret_token_key',
    resave: false,
    saveUninitialized: false
}));


app.use(authRoutes);
app.use(hospedeRoutes);
app.use(quartoRoutes);
app.use(reservaRoutes);

app.listen(3000, () => {
    console.log('🚀 Servidor rodando com sucesso em http://localhost:3000');
});