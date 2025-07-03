// Modelo de Partida con datos en memoria
let partidas = [
    {
        id: 1,
        idJuego: 1,
        jugadores: [1, 2],
        fecha: "2024-01-15T14:30:00.000Z",
        puntajes: {
            "1": 850,
            "2": 720
        }
    },
    {
        id: 2,
        idJuego: 2,
        jugadores: [2, 3],
        fecha: "2024-01-16T16:45:00.000Z",
        puntajes: {
            "2": 1200,
            "3": 980
        }
    },
    {
        id: 3,
        idJuego: 3,
        jugadores: [1, 2, 3],
        fecha: "2024-01-17T10:15:00.000Z",
        puntajes: {
            "1": 500,
            "2": 750,
            "3": 600
        }
    }
];

// Contador para generar IDs únicos
let nextMatchId = 4;

class Match {
    // Obtener todas las partidas
    static getAll() {
        return partidas;
    }

    // Obtener partida por ID
    static getById(id) {
        return partidas.find(match => match.id === parseInt(id));
    }

    // Crear nueva partida
    static create(matchData) {
        const newMatch = {
            id: nextMatchId++,
            idJuego: parseInt(matchData.idJuego),
            jugadores: matchData.jugadores.map(id => parseInt(id)),
            fecha: matchData.fecha || new Date().toISOString(),
            puntajes: matchData.puntajes || {}
        };
        partidas.push(newMatch);
        return newMatch;
    }

    // Actualizar partida
    static update(id, matchData) {
        const matchIndex = partidas.findIndex(match => match.id === parseInt(id));
        if (matchIndex === -1) return null;

        partidas[matchIndex] = {
            ...partidas[matchIndex],
            ...matchData,
            id: parseInt(id), // Mantener el ID original
            idJuego: parseInt(matchData.idJuego || partidas[matchIndex].idJuego),
            jugadores: matchData.jugadores ? 
                matchData.jugadores.map(id => parseInt(id)) : 
                partidas[matchIndex].jugadores
        };
        return partidas[matchIndex];
    }

    // Eliminar partida
    static delete(id) {
        const matchIndex = partidas.findIndex(match => match.id === parseInt(id));
        if (matchIndex === -1) return null;

        const deletedMatch = partidas[matchIndex];
        partidas.splice(matchIndex, 1);
        return deletedMatch;
    }

    // Obtener partidas por juego
    static getByGame(gameId) {
        return partidas.filter(match => match.idJuego === parseInt(gameId));
    }

    // Obtener partidas por jugador
    static getByPlayer(playerId) {
        return partidas.filter(match => 
            match.jugadores.includes(parseInt(playerId))
        );
    }

    // Obtener partidas por fecha
    static getByDate(fecha) {
        return partidas.filter(match => 
            match.fecha.startsWith(fecha)
        );
    }
}

module.exports = Match; 