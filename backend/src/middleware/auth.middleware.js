const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verificado = jwt.verify(token, 'lectarium_clave_secreta');
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(401).json({mensaje: 'Token no válido'});
    }
    
};

module.exports = {verificarToken};