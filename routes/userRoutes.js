const express = require('express');
const UserController = require('../controllers/userController');

// Crear router
const router = express.Router();

// Rutas para usuarios
// GET /usuarios - Obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// GET /usuarios/:id - Obtener usuario por ID
router.get('/:id', UserController.getUserById);

// POST /usuarios - Crear nuevo usuario
router.post('/', UserController.createUser);

// PUT /usuarios/:id - Actualizar usuario completo
router.put('/:id', UserController.updateUser);

// DELETE /usuarios/:id - Eliminar usuario
router.delete('/:id', UserController.deleteUser);

module.exports = router; 