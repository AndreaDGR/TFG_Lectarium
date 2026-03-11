const express = require('express');
const router = express.Router();
const {solicitarPrestamo, prestamosActivos} = require('../controllers/prestamos.controller');
const {verificarToken} = require('../middleware/auth.middleware');

router.post('/', verificarToken, solicitarPrestamo);
router.get('/activos', verificarToken, prestamosActivos);

module.exports = router;
