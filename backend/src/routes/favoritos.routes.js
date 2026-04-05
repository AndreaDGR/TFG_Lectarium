const express = require('express');
const router = express.Router();
const {añadirFavorito, obtenerFavoritos, eliminarFavorito } = require('../controllers/favoritos.controller');
const {verificarToken} = require('../middleware/auth.middleware');

router.post('/', verificarToken, añadirFavorito);
router.get('/', verificarToken, obtenerFavoritos);
router.delete('/:id_libro', verificarToken, eliminarFavorito);

module.exports = router;