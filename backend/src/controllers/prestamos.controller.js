const conexion = require('../config/db');

//Solicitar préstamo
const solicitarPrestamo = (req, res) => {
    const {id_libro} = req.body;
    const id_usuario = req.usuario.id;

    //Disponibilidad del libro
    const consultaDisponibilidad = 'SELECT disponibilidad FROM libros WHERE id_libro = ?';

    conexion.query(consultaDisponibilidad, [id_libro], (error, resultados) => {
        if (error) {
            return res.status(500).json({mensaje: 'Se ha producido un error al comprobar la disponibilidad'});
        }

        if (resultados.length === 0) {
            return res.status(404).json({mensaje: 'No se ha encontrado el libro'});
        }
        
        if (resultados[0].disponibilidad === 0) {
            return res.status(400).json({mensaje: 'Lo sentimos, este libro no está disponible'});
        }

        //Insert del préstamos en la base de datos
        const insertPrestamo = 'INSERT INTO prestamos (id_usuario, id_libro) VALUES (?, ?)';


        conexion.query(insertPrestamo, [id_usuario, id_libro], (error, resultado) => {
            if (error) {
                return res.status(500).json({mensaje: 'Se ha producido un error al solicitar el préstamo'});
            }

            //Cambiar el libro a no disponible
            const actualizarDisponibilidad = 'UPDATE libros SET disponibilidad = 0 WHERE id_libro = ?';

            conexion.query(actualizarDisponibilidad, [id_libro], (error) => {
                if (error) {
                    return res.status(500).json({mensaje: 'Se ha producido un error al actualizar la disponibilidad'});
                }
                res.status(201).json({mensaje: 'Se ha realizado el préstamo correctamente'});
            });
        });
    });
};

//Ver historial de préstamos del usuario
const historialPrestamos = (req, res) => {
    const id_usuario = req.usuario.id;

    const consulta = `
    SELECT prestamos.*, libros.titulo, libros.autor, genero.nombre AS genero,
    IF (prestamos.fecha_fin < NOW(), 'vencido', 'activo') AS estado
    FROM prestamos prestamos
    JOIN libros libros ON prestamos.id_libro = libros.id_libro
    JOIN generos genero ON libros.id_genero = genero.id_genero
    WHERE prestamos.id_usuario = ?
    ORDER BY prestamos.fecha_inicio DESC
    `;

    conexion.query(consulta, [id_usuario], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el historial de préstamos:', error);
            return res.status(500).json({mensaje: 'Se ha producido un error al obtener el historial de préstamos'});
        }
        res.json(resultados);
    });
}; 

// El usuario puede leer el libro si solicita el préstamo
const comprobarPrestamo = (req, res) => {
    const id_usuario = req.usuario.id;
    const { id_libro } = req.params;

    const consulta = `
        SELECT * FROM prestamos
        WHERE id_usuario = ? AND id_libro = ? AND fecha_fin > NOW()
    `;

    conexion.query(consulta, [id_usuario, id_libro], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al comprobar préstamo' });
        }
        res.json({ tienePrestamo: resultados.length > 0});
    });
};


module.exports = {solicitarPrestamo, historialPrestamos, comprobarPrestamo};