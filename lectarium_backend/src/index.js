const express = require('express');
const conexion = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const librosRoutes = require('./routes/libros.routes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});