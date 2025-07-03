// Middleware de validación
class ValidationMiddleware {
    // Validar ID de parámetro
    static validateId(req, res, next) {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                error: 'ID inválido',
                message: 'El ID debe ser un número válido'
            });
        }
        
        req.params.id = parseInt(id);
        next();
    }

    // Validar datos de usuario
    static validateUserData(req, res, next) {
        const { nombre, nickname, juegosFavoritos } = req.body;
        const errors = [];

        // Validar nombre
        if (nombre !== undefined) {
            if (typeof nombre !== 'string' || nombre.trim().length === 0) {
                errors.push('El nombre debe ser un texto no vacío');
            } else if (nombre.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
            } else if (nombre.trim().length > 100) {
                errors.push('El nombre no puede tener más de 100 caracteres');
            }
        }

        // Validar nickname
        if (nickname !== undefined) {
            if (typeof nickname !== 'string' || nickname.trim().length === 0) {
                errors.push('El nickname debe ser un texto no vacío');
            } else if (nickname.trim().length < 3) {
                errors.push('El nickname debe tener al menos 3 caracteres');
            } else if (nickname.trim().length > 50) {
                errors.push('El nickname no puede tener más de 50 caracteres');
            } else if (!/^[a-zA-Z0-9_]+$/.test(nickname.trim())) {
                errors.push('El nickname solo puede contener letras, números y guiones bajos');
            }
        }

        // Validar juegos favoritos
        if (juegosFavoritos !== undefined) {
            if (!Array.isArray(juegosFavoritos)) {
                errors.push('Los juegos favoritos deben ser un array');
            } else {
                for (const gameId of juegosFavoritos) {
                    if (!Number.isInteger(gameId) || gameId <= 0) {
                        errors.push('Todos los IDs de juegos favoritos deben ser números enteros positivos');
                        break;
                    }
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Datos de usuario inválidos',
                message: errors.join(', ')
            });
        }

        next();
    }

    // Validar datos de juego
    static validateGameData(req, res, next) {
        const { nombre, genero, desarrollador } = req.body;
        const errors = [];

        // Validar nombre
        if (nombre !== undefined) {
            if (typeof nombre !== 'string' || nombre.trim().length === 0) {
                errors.push('El nombre debe ser un texto no vacío');
            } else if (nombre.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
            } else if (nombre.trim().length > 200) {
                errors.push('El nombre no puede tener más de 200 caracteres');
            }
        }

        // Validar género
        if (genero !== undefined) {
            if (typeof genero !== 'string' || genero.trim().length === 0) {
                errors.push('El género debe ser un texto no vacío');
            } else if (genero.trim().length < 2) {
                errors.push('El género debe tener al menos 2 caracteres');
            } else if (genero.trim().length > 50) {
                errors.push('El género no puede tener más de 50 caracteres');
            }
        }

        // Validar desarrollador
        if (desarrollador !== undefined) {
            if (typeof desarrollador !== 'string' || desarrollador.trim().length === 0) {
                errors.push('El desarrollador debe ser un texto no vacío');
            } else if (desarrollador.trim().length < 2) {
                errors.push('El desarrollador debe tener al menos 2 caracteres');
            } else if (desarrollador.trim().length > 100) {
                errors.push('El desarrollador no puede tener más de 100 caracteres');
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Datos de juego inválidos',
                message: errors.join(', ')
            });
        }

        next();
    }

    // Validar datos de partida
    static validateMatchData(req, res, next) {
        const { idJuego, jugadores, fecha, puntajes } = req.body;
        const errors = [];

        // Validar idJuego
        if (idJuego !== undefined) {
            if (!Number.isInteger(idJuego) || idJuego <= 0) {
                errors.push('El ID del juego debe ser un número entero positivo');
            }
        }

        // Validar jugadores
        if (jugadores !== undefined) {
            if (!Array.isArray(jugadores)) {
                errors.push('Los jugadores deben ser un array');
            } else if (jugadores.length === 0) {
                errors.push('Debe haber al menos un jugador');
            } else if (jugadores.length > 10) {
                errors.push('No puede haber más de 10 jugadores por partida');
            } else {
                for (const jugadorId of jugadores) {
                    if (!Number.isInteger(jugadorId) || jugadorId <= 0) {
                        errors.push('Todos los IDs de jugadores deben ser números enteros positivos');
                        break;
                    }
                }
            }
        }

        // Validar fecha
        if (fecha !== undefined) {
            const fechaObj = new Date(fecha);
            if (isNaN(fechaObj.getTime())) {
                errors.push('La fecha debe tener un formato válido (ISO 8601)');
            } else if (fechaObj > new Date()) {
                errors.push('La fecha no puede ser futura');
            }
        }

        // Validar puntajes
        if (puntajes !== undefined) {
            if (typeof puntajes !== 'object' || Array.isArray(puntajes)) {
                errors.push('Los puntajes deben ser un objeto');
            } else {
                for (const [jugadorId, puntaje] of Object.entries(puntajes)) {
                    if (isNaN(parseInt(jugadorId))) {
                        errors.push('Las claves de puntajes deben ser IDs de jugadores válidos');
                        break;
                    }
                    if (typeof puntaje !== 'number' || puntaje < 0) {
                        errors.push('Todos los puntajes deben ser números no negativos');
                        break;
                    }
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Datos de partida inválidos',
                message: errors.join(', ')
            });
        }

        next();
    }

    // Validar parámetros de consulta
    static validateQueryParams(req, res, next) {
        const { genero, jugador, juego, fecha } = req.query;

        if (jugador && (isNaN(parseInt(jugador)) || parseInt(jugador) <= 0)) {
            return res.status(400).json({
                success: false,
                error: 'Parámetro inválido',
                message: 'El parámetro jugador debe ser un número entero positivo'
            });
        }

        if (juego && (isNaN(parseInt(juego)) || parseInt(juego) <= 0)) {
            return res.status(400).json({
                success: false,
                error: 'Parámetro inválido',
                message: 'El parámetro juego debe ser un número entero positivo'
            });
        }

        if (fecha && isNaN(new Date(fecha).getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Parámetro inválido',
                message: 'El parámetro fecha debe tener un formato válido (YYYY-MM-DD)'
            });
        }

        next();
    }
}

module.exports = ValidationMiddleware; 