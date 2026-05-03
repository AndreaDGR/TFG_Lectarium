const express = require('express');
const router = express.Router();
const {solicitarPrestamo, historialPrestamos, comprobarPrestamo} = require('../controllers/prestamos.controller');
const {verificarToken} = require('../middleware/auth.middleware');

router.post('/', verificarToken, solicitarPrestamo);
router.get('/historial', verificarToken, historialPrestamos);
router.get('/comprobar/:id_libro', verificarToken, comprobarPrestamo);

module.exports = router;
