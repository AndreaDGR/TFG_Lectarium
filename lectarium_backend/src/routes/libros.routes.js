const express = require('express');
const router = express.Router();
const {obtenerLibros, obtenerLibro, buscarLibros} = require('../controllers/libros.controller');

router.get('/', obtenerLibros);
router.get('/buscar', buscarLibros);
router.get('/:id', obtenerLibro);


module.exports = router;