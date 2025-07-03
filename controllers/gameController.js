const Game = require('../models/Game');

// Controlador de Juegos
class GameController {
    // GET /juegos - Obtener todos los juegos
    static getAllGames(req, res) {
        try {
            const { genero } = req.query;
            
            let juegos;
            if (genero) {
                juegos = Game.getByGenre(genero);
            } else {
                juegos = Game.getAll();
            }

            res.json({
                success: true,
                count: juegos.length,
                data: juegos,
                ...(genero && { filtro: { genero } })
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener juegos',
                message: error.message
            });
        }
    }

    // GET /juegos/:id - Obtener juego por ID
    static getGameById(req, res) {
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

            const juego = Game.getById(id);
            
            if (!juego) {
                return res.status(404).json({
                    success: false,
                    error: 'Juego no encontrado',
                    message: `No existe un juego con ID ${id}`
                });
            }

            res.json({
                success: true,
                data: juego
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener juego',
                message: error.message
            });
        }
    }

    // POST /juegos - Crear nuevo juego
    static createGame(req, res) {
        try {
            const { nombre, genero, desarrollador } = req.body;

            // Validaciones básicas
            if (!nombre || !genero || !desarrollador) {
                return res.status(400).json({
                    success: false,
                    error: 'Datos requeridos faltantes',
                    message: 'Los campos nombre, genero y desarrollador son obligatorios'
                });
            }

            // Validar que el nombre no exista
            if (Game.nameExists(nombre)) {
                return res.status(400).json({
                    success: false,
                    error: 'Juego ya existe',
                    message: `Ya existe un juego con el nombre "${nombre}"`
                });
            }

            const nuevoJuego = Game.create({ nombre, genero, desarrollador });

            res.status(201).json({
                success: true,
                message: 'Juego creado exitosamente',
                data: nuevoJuego
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al crear juego',
                message: error.message
            });
        }
    }

    // PUT /juegos/:id - Actualizar juego
    static updateGame(req, res) {
        try {
            const { id } = req.params;
            const { nombre, genero, desarrollador } = req.body;

            // Validar que el ID sea un número
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID inválido',
                    message: 'El ID debe ser un número válido'
                });
            }

            // Verificar que el juego existe
            if (!Game.getById(id)) {
                return res.status(404).json({
                    success: false,
                    error: 'Juego no encontrado',
                    message: `No existe un juego con ID ${id}`
                });
            }

            // Validar nombre único (excluyendo el juego actual)
            if (nombre && Game.nameExists(nombre, parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    error: 'Nombre ya existe',
                    message: `Ya existe un juego con el nombre "${nombre}"`
                });
            }

            const juegoActualizado = Game.update(id, { nombre, genero, desarrollador });

            res.json({
                success: true,
                message: 'Juego actualizado exitosamente',
                data: juegoActualizado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al actualizar juego',
                message: error.message
            });
        }
    }

    // DELETE /juegos/:id - Eliminar juego
    static deleteGame(req, res) {
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

            const juegoEliminado = Game.delete(id);

            if (!juegoEliminado) {
                return res.status(404).json({
                    success: false,
                    error: 'Juego no encontrado',
                    message: `No existe un juego con ID ${id}`
                });
            }

            res.json({
                success: true,
                message: 'Juego eliminado exitosamente',
                data: juegoEliminado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al eliminar juego',
                message: error.message
            });
        }
    }
}

module.exports = GameController; 