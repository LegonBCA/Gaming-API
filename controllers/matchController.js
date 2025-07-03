const Match = require('../models/Match');
const User = require('../models/User');
const Game = require('../models/Game'); // Actualizar import para usar Game.js

// Controlador de Partidas
class MatchController {
    // GET /partidas - Obtener todas las partidas
    static getAllMatches(req, res) {
        try {
            const { juego, jugador, fecha } = req.query;
            
            let partidas;
            
            if (juego) {
                partidas = Match.getByGame(juego);
            } else if (jugador) {
                partidas = Match.getByPlayer(jugador);
            } else if (fecha) {
                partidas = Match.getByDate(fecha);
            } else {
                partidas = Match.getAll();
            }

            res.json({
                success: true,
                count: partidas.length,
                data: partidas,
                ...(juego && { filtro: { juego } }),
                ...(jugador && { filtro: { jugador } }),
                ...(fecha && { filtro: { fecha } })
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener partidas',
                message: error.message
            });
        }
    }

    // GET /partidas/:id - Obtener partida por ID
    static getMatchById(req, res) {
        try {
            const { id } = req.params;
            
            // Validar que el ID sea un número
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID inválido',
                    message: 'El ID debe ser un número válido'
                });
            }

            const partida = Match.getById(id);
            
            if (!partida) {
                return res.status(404).json({
                    success: false,
                    error: 'Partida no encontrada',
                    message: `No existe una partida con ID ${id}`
                });
            }

            res.json({
                success: true,
                data: partida
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener partida',
                message: error.message
            });
        }
    }

    // POST /partidas - Crear nueva partida
    static createMatch(req, res) {
        try {
            const { idJuego, jugadores, fecha, puntajes } = req.body;

            // Validaciones básicas
            if (!idJuego || !jugadores || !Array.isArray(jugadores) || jugadores.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Datos requeridos faltantes',
                    message: 'Los campos idJuego y jugadores (array no vacío) son obligatorios'
                });
            }

            // Validar que el juego existe
            if (!Game.exists(idJuego)) {
                return res.status(400).json({
                    success: false,
                    error: 'Juego no válido',
                    message: `El juego con ID ${idJuego} no existe`
                });
            }

            // Validar que todos los jugadores existen
            for (const jugadorId of jugadores) {
                if (!User.exists(jugadorId)) {
                    return res.status(400).json({
                        success: false,
                        error: 'Jugador no válido',
                        message: `El usuario con ID ${jugadorId} no existe`
                    });
                }
            }

            // Validar que no hay jugadores duplicados
            const jugadoresUnicos = [...new Set(jugadores)];
            if (jugadoresUnicos.length !== jugadores.length) {
                return res.status(400).json({
                    success: false,
                    error: 'Jugadores duplicados',
                    message: 'No puede haber jugadores duplicados en una partida'
                });
            }

            // Validar formato de fecha si se proporciona
            if (fecha) {
                const fechaValida = new Date(fecha);
                if (isNaN(fechaValida.getTime())) {
                    return res.status(400).json({
                        success: false,
                        error: 'Fecha inválida',
                        message: 'La fecha debe tener un formato válido (ISO 8601)'
                    });
                }
            }

            // Validar puntajes si se proporcionan
            if (puntajes) {
                if (typeof puntajes !== 'object') {
                    return res.status(400).json({
                        success: false,
                        error: 'Puntajes inválidos',
                        message: 'Los puntajes deben ser un objeto'
                    });
                }

                // Verificar que los puntajes corresponden a jugadores de la partida
                for (const jugadorId in puntajes) {
                    if (!jugadores.includes(parseInt(jugadorId))) {
                        return res.status(400).json({
                            success: false,
                            error: 'Puntaje inválido',
                            message: `El jugador ${jugadorId} no está en la partida`
                        });
                    }
                }
            }

            const nuevaPartida = Match.create({ idJuego, jugadores, fecha, puntajes });

            res.status(201).json({
                success: true,
                message: 'Partida creada exitosamente',
                data: nuevaPartida
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al crear partida',
                message: error.message
            });
        }
    }

    // PUT /partidas/:id - Actualizar partida
    static updateMatch(req, res) {
        try {
            const { id } = req.params;
            const { idJuego, jugadores, fecha, puntajes } = req.body;

            // Validar que el ID sea un número
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID inválido',
                    message: 'El ID debe ser un número válido'
                });
            }

            // Verificar que la partida existe
            if (!Match.getById(id)) {
                return res.status(404).json({
                    success: false,
                    error: 'Partida no encontrada',
                    message: `No existe una partida con ID ${id}`
                });
            }

            // Validaciones similares a create (solo para campos proporcionados)
            if (idJuego && !Game.exists(idJuego)) {
                return res.status(400).json({
                    success: false,
                    error: 'Juego no válido',
                    message: `El juego con ID ${idJuego} no existe`
                });
            }

            if (jugadores) {
                if (!Array.isArray(jugadores) || jugadores.length === 0) {
                    return res.status(400).json({
                        success: false,
                        error: 'Jugadores inválidos',
                        message: 'Los jugadores deben ser un array no vacío'
                    });
                }

                for (const jugadorId of jugadores) {
                    if (!User.exists(jugadorId)) {
                        return res.status(400).json({
                            success: false,
                            error: 'Jugador no válido',
                            message: `El usuario con ID ${jugadorId} no existe`
                        });
                    }
                }

                const jugadoresUnicos = [...new Set(jugadores)];
                if (jugadoresUnicos.length !== jugadores.length) {
                    return res.status(400).json({
                        success: false,
                        error: 'Jugadores duplicados',
                        message: 'No puede haber jugadores duplicados en una partida'
                    });
                }
            }

            if (fecha) {
                const fechaValida = new Date(fecha);
                if (isNaN(fechaValida.getTime())) {
                    return res.status(400).json({
                        success: false,
                        error: 'Fecha inválida',
                        message: 'La fecha debe tener un formato válido (ISO 8601)'
                    });
                }
            }

            const partidaActualizada = Match.update(id, { idJuego, jugadores, fecha, puntajes });

            res.json({
                success: true,
                message: 'Partida actualizada exitosamente',
                data: partidaActualizada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al actualizar partida',
                message: error.message
            });
        }
    }

    // DELETE /partidas/:id - Eliminar partida
    static deleteMatch(req, res) {
        try {
            const { id } = req.params;

            // Validar que el ID sea un número
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID inválido',
                    message: 'El ID debe ser un número válido'
                });
            }

            const partidaEliminada = Match.delete(id);

            if (!partidaEliminada) {
                return res.status(404).json({
                    success: false,
                    error: 'Partida no encontrada',
                    message: `No existe una partida con ID ${id}`
                });
            }

            res.json({
                success: true,
                message: 'Partida eliminada exitosamente',
                data: partidaEliminada
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al eliminar partida',
                message: error.message
            });
        }
    }
}

module.exports = MatchController; 