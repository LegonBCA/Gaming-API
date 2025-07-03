// Middleware de manejo de errores global
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    let error = { ...err };
    error.message = err.message;

    // Errores de sintaxis JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            error: 'JSON malformado',
            message: 'La estructura del JSON enviado no es válida'
        });
    }

    // Error de validación personalizado
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            success: false,
            error: 'Error de validación',
            message: message.join(', ')
        });
    }

    // Error de recurso no encontrado
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            success: false,
            error: 'Recurso no encontrado',
            message: err.message || 'El recurso solicitado no existe'
        });
    }

    // Error de autorización
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            error: 'No autorizado',
            message: err.message || 'Acceso no autorizado'
        });
    }

    // Error de datos duplicados
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            error: 'Recurso duplicado',
            message: `El campo ${field} ya existe`
        });
    }

    // Error interno del servidor por defecto
    res.status(err.statusCode || 500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'production' 
            ? 'Algo salió mal, intenta nuevamente' 
            : err.message
    });
};

module.exports = errorHandler; 