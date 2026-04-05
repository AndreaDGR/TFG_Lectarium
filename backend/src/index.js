const express = require('express');
const conexion = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const librosRoutes = require('./routes/libros.routes');
const prestamosRoutes = require('./routes/prestamos.routes');
const favoritosRoutes = require('./routes/favoritos.routes');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/favoritos', favoritosRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});