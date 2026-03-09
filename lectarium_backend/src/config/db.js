const mysql = require('mysql2');
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexion.connect((error) => {
    if (error) {
        console.error('Se ha producido un error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos realizada correctamente.');
});

module.exports = conexion;