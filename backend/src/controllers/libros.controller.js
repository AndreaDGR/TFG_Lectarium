const conexion = require('../config/db');

//Obtener todos los libros
const obtenerLibros = (req, res) => {
    const consulta = 'SELECT libros.*, genero.nombre AS genero FROM libros libros JOIN generos genero ON libros.id_genero = genero.id_genero';

    conexion.query(consulta, (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Se ha producido un error al obtener los libros' });
        }
        res.json(resultados);
    });
};

//Obtener un libro por su id 
const obtenerLibro = (req, res) => {
    const { id } = req.params;
    const consulta = 'SELECT libros.*, genero.nombre AS genero FROM libros libros JOIN generos genero ON libros.id_genero = genero.id_genero WHERE libros.id_libro = ?';

    conexion.query(consulta, [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Se ha producido un error al obtener el libro' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }
        res.json(resultados);
    });
};

//Búsqueda de libro por título, autor o género
const buscarLibros = (req, res) => {
    const { query } = req.query;

    const consulta = `SELECT libros.*, genero.nombre AS genero FROM libros libros JOIN generos genero ON libros.id_genero = genero.id_genero
    WHERE libros.titulo LIKE ? OR libros.autor LIKE ? OR genero.nombre LIKE ?`;

    const busqueda = `%${query}%`;

    conexion.query(consulta, [busqueda, busqueda, busqueda], (error, resultados) => {
        if (error) {
            console.error('Error en buscarLibros:', error);
            return res.status(500).json({ mensaje: 'Se ha producido un error en la búsqueda' });
        }
        res.json(resultados);
    });
};

// Obtener libros destacados

const obtenerDestacados = (req, res) => {
    const consulta = `
        SELECT libros.*, genero.nombre AS genero, COUNT(fav.id_libro) AS total_favoritos
        FROM libros libros
        JOIN generos genero ON libros.id_genero = genero.id_genero
        LEFT JOIN favoritos fav ON libros.id_libro = fav.id_libro
        GROUP BY libros.id_libro
        ORDER BY total_favoritos DESC
        LIMIT 10
    `;

    conexion.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener destacados:', error);
            return res.status(500).json({ mensaje: 'Error al obtener los libros destacados' });
        }
        res.json(resultados);
    });
};

module.exports = { obtenerLibros, obtenerLibro, buscarLibros, obtenerDestacados };