const express = require('express');
const GameController = require('../controllers/gameController');

// Crear router
const router = express.Router();

// Rutas para juegos
// GET /juegos - Obtener todos los juegos (con filtro opcional por género)
router.get('/', GameController.getAllGames);

// GET /juegos/:id - Obtener juego por ID
router.get('/:id', GameController.getGameById);

// POST /juegos - Crear nuevo juego
router.post('/', GameController.createGame);

// PUT /juegos/:id - Actualizar juego completo
router.put('/:id', GameController.updateGame);

// DELETE /juegos/:id - Eliminar juego
router.delete('/:id', GameController.deleteGame);

module.exports = router; 