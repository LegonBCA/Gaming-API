const express = require('express');
const cors = require('cors');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Importar middleware
const errorHandler = require('./middleware/errorHandler');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging básico
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rutas principales
app.use('/usuarios', userRoutes);
app.use('/juegos', gameRoutes);
app.use('/partidas', matchRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API de Red Social de Juegos',
        version: '1.0.0',
        rutas: {
            usuarios: '/usuarios',
            juegos: '/juegos',
            partidas: '/partidas'
        }
    });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.originalUrl} no existe`
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📱 API disponible en: http://localhost:${PORT}`);
    console.log(`📚 Documentación en: http://localhost:${PORT}/`);
});

module.exports = app; 