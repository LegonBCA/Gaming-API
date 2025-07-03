const User = require('../models/User');
const Game = require('../models/Game'); // Actualizar import para usar Game.js

// Controlador de Usuarios
class UserController {
    // GET /usuarios - Obtener todos los usuarios
    static getAllUsers(req, res) {
        try {
            const usuarios = User.getAll();
            res.json({
                success: true,
                count: usuarios.length,
                data: usuarios
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener usuarios',
                message: error.message
            });
        }
    }

    // GET /usuarios/:id - Obtener usuario por ID
    static getUserById(req, res) {
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

            const usuario = User.getById(id);
            
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuario no encontrado',
                    message: `No existe un usuario con ID ${id}`
                });
            }

            res.json({
                success: true,
                data: usuario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener usuario',
                message: error.message
            });
        }
    }

    // POST /usuarios - Crear nuevo usuario
    static createUser(req, res) {
        try {
            const { nombre, nickname, juegosFavoritos } = req.body;

            // Validaciones básicas
            if (!nombre || !nickname) {
                return res.status(400).json({
                    success: false,
                    error: 'Datos requeridos faltantes',
                    message: 'Los campos nombre y nickname son obligatorios'
                });
            }

            // Validar que el nickname no exista
            if (User.nicknameExists(nickname)) {
                return res.status(400).json({
                    success: false,
                    error: 'Nickname ya existe',
                    message: `El nickname "${nickname}" ya está en uso`
                });
            }

            // Validar juegos favoritos si se proporcionan
            if (juegosFavoritos && Array.isArray(juegosFavoritos)) {
                for (const gameId of juegosFavoritos) {
                    if (!Game.exists(gameId)) {
                        return res.status(400).json({
                            success: false,
                            error: 'Juego no válido',
                            message: `El juego con ID ${gameId} no existe`
                        });
                    }
                }
            }

            const nuevoUsuario = User.create({ nombre, nickname, juegosFavoritos });

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                data: nuevoUsuario
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al crear usuario',
                message: error.message
            });
        }
    }

    // PUT /usuarios/:id - Actualizar usuario
    static updateUser(req, res) {
        try {
            const { id } = req.params;
            const { nombre, nickname, juegosFavoritos } = req.body;

            // Validar que el ID sea un número
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID inválido',
                    message: 'El ID debe ser un número válido'
                });
            }

            // Verificar que el usuario existe
            if (!User.exists(id)) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuario no encontrado',
                    message: `No existe un usuario con ID ${id}`
                });
            }

            // Validar nickname único (excluyendo el usuario actual)
            if (nickname && User.nicknameExists(nickname, parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    error: 'Nickname ya existe',
                    message: `El nickname "${nickname}" ya está en uso`
                });
            }

            // Validar juegos favoritos si se proporcionan
            if (juegosFavoritos && Array.isArray(juegosFavoritos)) {
                for (const gameId of juegosFavoritos) {
                    if (!Game.exists(gameId)) {
                        return res.status(400).json({
                            success: false,
                            error: 'Juego no válido',
                            message: `El juego con ID ${gameId} no existe`
                        });
                    }
                }
            }

            const usuarioActualizado = User.update(id, { nombre, nickname, juegosFavoritos });

            res.json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: usuarioActualizado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al actualizar usuario',
                message: error.message
            });
        }
    }

    // DELETE /usuarios/:id - Eliminar usuario
    static deleteUser(req, res) {
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

            const usuarioEliminado = User.delete(id);

            if (!usuarioEliminado) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuario no encontrado',
                    message: `No existe un usuario con ID ${id}`
                });
            }

            res.json({
                success: true,
                message: 'Usuario eliminado exitosamente',
                data: usuarioEliminado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al eliminar usuario',
                message: error.message
            });
        }
    }
}

module.exports = UserController; 