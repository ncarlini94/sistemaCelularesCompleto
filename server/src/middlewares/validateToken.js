const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).json({ message: 'No token, Acceso denegado.' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authRequired
};
