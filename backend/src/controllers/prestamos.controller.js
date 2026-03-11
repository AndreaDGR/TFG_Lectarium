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

//Ver préstamos activos del usuario
const prestamosActivos = (req, res) => {
    const id_usuario = req.usuario.id;

    const consulta = `
    SELECT prestamos.*, libros.titulo, libros.autor, genero.nombre AS genero
    FROM prestamos prestamos
    JOIN libros libros ON prestamos.id_libro = libros.id_libro
    JOIN generos genero ON libros.id_genero = genero.id_genero
    WHERE prestamos.id_usuario = ? AND prestamos.estado = 'activo'
    `;

    conexion.query(consulta, [id_usuario], (error, resultados) => {
        if (error) {
            return res.status(500).json({mensaje: 'Se ha producido un error al obtener los préstamos activos'});
        }
        res.json(resultados);
    });
}; 

module.exports = {solicitarPrestamo, prestamosActivos};