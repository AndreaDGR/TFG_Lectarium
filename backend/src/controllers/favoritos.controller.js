const conexion = require('../config/db');

// Añadir libro a favoritos
const añadirFavorito = (req, res) => {
    const { id_libro } = req.body;
    const id_usuario = req.usuario.id;

    const consulta = 'INSERT INTO favoritos (id_usuario, id_libro) VALUES (?, ?)';

    conexion.query(consulta, [id_usuario, id_libro], (error, resultado) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ mensaje: 'El libro ya está en favoritos' });
            }
            return res.status(500).json({ mensaje: 'Error al añadir a favoritos' });
        }
        res.status(201).json({ mensaje: 'Libro añadido a favoritos correctamente' });
    });
};

// Obtener favoritos del usuario
const obtenerFavoritos = (req, res) => {
    const id_usuario = req.usuario.id;

    const consulta = `
        SELECT fav.*, libro.titulo, libro.autor, libro.anio_publicacion, libro.portada_url,genero.nombre AS genero
        FROM favoritos fav
        JOIN libros libro ON fav.id_libro = libro.id_libro
        JOIN generos genero ON libro.id_genero = genero.id_genero
        WHERE fav.id_usuario = ?
    `;

    conexion.query(consulta, [id_usuario], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al obtener favoritos' });
        }
        res.json(resultados);
    });
};

// Eliminar libro de favoritos
const eliminarFavorito = (req, res) => {
    const { id_libro } = req.params;
    const id_usuario = req.usuario.id;

    const consulta = 'DELETE FROM favoritos WHERE id_usuario = ? AND id_libro = ?';

    conexion.query(consulta, [id_usuario, id_libro], (error, resultado) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al eliminar de favoritos' });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Favorito no encontrado' });
        }
        res.json({ mensaje: 'Libro eliminado de favoritos correctamente' });
    });
};

module.exports = { añadirFavorito, obtenerFavoritos, eliminarFavorito };