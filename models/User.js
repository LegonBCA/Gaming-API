// Modelo de Usuario con datos en memoria
let usuarios = [
    {
        id: 1,
        nombre: "Ana García",
        nickname: "AnaGamer",
        juegosFavoritos: [1, 2]
    },
    {
        id: 2,
        nombre: "Carlos López",
        nickname: "CarlosGG",
        juegosFavoritos: [1, 3]
    },
    {
        id: 3,
        nombre: "María González",
        nickname: "MaryPlayer",
        juegosFavoritos: [2, 3]
    }
];

// Contador para generar IDs únicos
let nextUserId = 4;

class User {
    // Obtener todos los usuarios
    static getAll() {
        return usuarios;
    }

    // Obtener usuario por ID
    static getById(id) {
        return usuarios.find(user => user.id === parseInt(id));
    }

    // Crear nuevo usuario
    static create(userData) {
        const newUser = {
            id: nextUserId++,
            nombre: userData.nombre,
            nickname: userData.nickname,
            juegosFavoritos: userData.juegosFavoritos || []
        };
        usuarios.push(newUser);
        return newUser;
    }

    // Actualizar usuario
    static update(id, userData) {
        const userIndex = usuarios.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) return null;

        usuarios[userIndex] = {
            ...usuarios[userIndex],
            ...userData,
            id: parseInt(id) // Mantener el ID original
        };
        return usuarios[userIndex];
    }

    // Eliminar usuario
    static delete(id) {
        const userIndex = usuarios.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) return null;

        const deletedUser = usuarios[userIndex];
        usuarios.splice(userIndex, 1);
        return deletedUser;
    }

    // Validar que exista el usuario
    static exists(id) {
        return usuarios.some(user => user.id === parseInt(id));
    }

    // Verificar si el nickname ya existe
    static nicknameExists(nickname, excludeId = null) {
        return usuarios.some(user => 
            user.nickname === nickname && user.id !== excludeId
        );
    }
}

module.exports = User; 