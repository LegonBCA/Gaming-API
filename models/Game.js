// Modelo de Juego con datos en memoria
let juegos = [
    {
        id: 1,
        nombre: "The Legend of Zelda: Breath of the Wild",
        genero: "Aventura",
        desarrollador: "Nintendo"
    },
    {
        id: 2,
        nombre: "Counter-Strike 2",
        genero: "FPS",
        desarrollador: "Valve"
    },
    {
        id: 3,
        nombre: "Minecraft",
        genero: "Sandbox",
        desarrollador: "Mojang Studios"
    },
    {
        id: 4,
        nombre: "Overwatch 2",
        genero: "FPS",
        desarrollador: "Blizzard Entertainment"
    }
];

// Contador para generar IDs únicos
let nextGameId = 5;

class Game {
    // Obtener todos los juegos
    static getAll() {
        return juegos;
    }

    // Obtener juego por ID
    static getById(id) {
        return juegos.find(game => game.id === parseInt(id));
    }

    // Crear nuevo juego
    static create(gameData) {
        const newGame = {
            id: nextGameId++,
            nombre: gameData.nombre,
            genero: gameData.genero,
            desarrollador: gameData.desarrollador
        };
        juegos.push(newGame);
        return newGame;
    }

    // Actualizar juego
    static update(id, gameData) {
        const gameIndex = juegos.findIndex(game => game.id === parseInt(id));
        if (gameIndex === -1) return null;

        juegos[gameIndex] = {
            ...juegos[gameIndex],
            ...gameData,
            id: parseInt(id) // Mantener el ID original
        };
        return juegos[gameIndex];
    }

    // Eliminar juego
    static delete(id) {
        const gameIndex = juegos.findIndex(game => game.id === parseInt(id));
        if (gameIndex === -1) return null;

        const deletedGame = juegos[gameIndex];
        juegos.splice(gameIndex, 1);
        return deletedGame;
    }

    // Validar que exista el juego
    static exists(id) {
        return juegos.some(game => game.id === parseInt(id));
    }

    // Verificar si el nombre ya existe
    static nameExists(nombre, excludeId = null) {
        return juegos.some(game => 
            game.nombre.toLowerCase() === nombre.toLowerCase() && game.id !== excludeId
        );
    }

    // Obtener juegos por género
    static getByGenre(genero) {
        return juegos.filter(game => 
            game.genero.toLowerCase() === genero.toLowerCase()
        );
    }
}

module.exports = Game; 