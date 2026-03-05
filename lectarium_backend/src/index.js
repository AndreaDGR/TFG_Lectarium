const express = require('express');
const conexion = require('./config/db');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});