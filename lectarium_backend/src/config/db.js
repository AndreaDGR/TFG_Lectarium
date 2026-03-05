const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '170911Teamo',
    database: 'lectarium'
});

conexion.connect((err) => {
    if (err) {
        console.error('Se ha producido un error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos realizada correctamente.');
});

module.exports = conexion;