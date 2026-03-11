const bcrypt = require('bcrypt');
const conexion = require('../config/db');


//Función de registro de usuarios
const registro = (req, res) => {
    const { nombre, email, contraseña } = req.body;

    const consulta = 'INSERT INTO usuarios (nombre, email, hash_contraseña) VALUES (?, ?, ?)';

    bcrypt.hash(contraseña, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al hashear la contraseña'});
        }

        conexion.query(consulta, [nombre, email, hash], (err, result) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al registrar usuario'});
            }
            res.status(201).json({ mensaje: 'Usuario registrado correctamente'});
        });
    });
};

//Función de inicio de sesión de usuarios
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const {email, contraseña} = req.body;

    const consulta = 'SELECT * FROM usuarios WHERE email = ?';

    conexion.query(consulta, [email], (err, results) => {
        if (err) {
            return res.status(500).json({mensaje: 'Error en el servidor'});
        }

        if (results.length === 0) {
            return res.status(401).json({mensaje: 'Email o contraseña incorrectos'});
        }

        const usuario = results[0];

        bcrypt.compare(contraseña, usuario.hash_contraseña, (err, coincide) => {
            if (err || !coincide) {
                return res.status(401).json({mensaje: 'Email o contraseña incorrectos'});
            }

            const token = jwt.sign(
                {id: usuario.id_usuario, rol: usuario.rol},
                'lectarium_clave_secreta',
                {expiresIn: '24h'}
            );

            res.json({token, mensaje: 'Inicio de sesión correcto'});
        });
    });
};

module.exports = {registro, login};