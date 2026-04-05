const express = require('express');
const router = express.Router();
const {obtenerLibros, obtenerLibro, buscarLibros, obtenerDestacados, obtenerNovedades} = require('../controllers/libros.controller');

router.get('/', obtenerLibros);
router.get('/buscar', buscarLibros);
router.get('/destacados', obtenerDestacados);
router.get('/novedades', obtenerNovedades);
router.get('/:id', obtenerLibro);



module.exports = router;