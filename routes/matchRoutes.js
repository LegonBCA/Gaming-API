const express = require('express');
const MatchController = require('../controllers/matchController');

// Crear router
const router = express.Router();

// Rutas para partidas
// GET /partidas - Obtener todas las partidas (con filtros opcionales)
router.get('/', MatchController.getAllMatches);

// GET /partidas/:id - Obtener partida por ID
router.get('/:id', MatchController.getMatchById);

// POST /partidas - Crear nueva partida
router.post('/', MatchController.createMatch);

// PUT /partidas/:id - Actualizar partida completa
router.put('/:id', MatchController.updateMatch);

// DELETE /partidas/:id - Eliminar partida
router.delete('/:id', MatchController.deleteMatch);

module.exports = router; 