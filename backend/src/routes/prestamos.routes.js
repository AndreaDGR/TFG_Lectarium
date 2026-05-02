const express = require('express');
const router = express.Router();
const {solicitarPrestamo, historialPrestamos} = require('../controllers/prestamos.controller');
const {verificarToken} = require('../middleware/auth.middleware');

router.post('/', verificarToken, solicitarPrestamo);
router.get('/historial', verificarToken, historialPrestamos);

module.exports = router;
