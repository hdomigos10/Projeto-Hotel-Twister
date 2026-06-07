module.exports = (req, res, next) => {
    if (req.session && req.session.usuarioLogado) {
        return next();
    }
    
    res.redirect('/login');
};