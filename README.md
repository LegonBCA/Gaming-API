# 🎮 API Red Social de Juegos

API REST para una red social de juegos desarrollada con Node.js y Express. Permite gestionar usuarios, juegos y partidas usando datos en memoria (sin base de datos).

## 🚀 Características

- **CRUD completo** para usuarios, juegos y partidas
- **Validaciones** de datos y relaciones entre entidades
- **Filtros** y búsquedas por diferentes criterios
- **Mensajes de error** claros y descriptivos
- **Datos en memoria** - no requiere base de datos
- **API RESTful** siguiendo las mejores prácticas

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd gaming-social-network-api
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor:
```bash
npm start
```

O para desarrollo con auto-recarga:
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## 📊 Estructura de Datos

### 👤 Usuario
```json
{
  "id": 1,
  "nombre": "Ana García",
  "nickname": "AnaGamer",
  "juegosFavoritos": [1, 2]
}
```

### 🎮 Juego
```json
{
  "id": 1,
  "nombre": "The Legend of Zelda: Breath of the Wild",
  "genero": "Aventura",
  "desarrollador": "Nintendo"
}
```

### 🏆 Partida
```json
{
  "id": 1,
  "idJuego": 1,
  "jugadores": [1, 2],
  "fecha": "2024-01-15T14:30:00.000Z",
  "puntajes": {
    "1": 850,
    "2": 720
  }
}
```

## 🛣️ Endpoints de la API

### 👤 Usuarios (`/usuarios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/usuarios` | Obtener todos los usuarios |
| GET | `/usuarios/:id` | Obtener usuario por ID |
| POST | `/usuarios` | Crear nuevo usuario |
| PUT | `/usuarios/:id` | Actualizar usuario |
| DELETE | `/usuarios/:id` | Eliminar usuario |

**Ejemplo - Crear usuario:**
```bash
POST /usuarios
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "nickname": "JuanGamer",
  "juegosFavoritos": [1, 3]
}
```

### 🎮 Juegos (`/juegos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/juegos` | Obtener todos los juegos |
| GET | `/juegos?genero=FPS` | Filtrar juegos por género |
| GET | `/juegos/:id` | Obtener juego por ID |
| POST | `/juegos` | Crear nuevo juego |
| PUT | `/juegos/:id` | Actualizar juego |
| DELETE | `/juegos/:id` | Eliminar juego |

**Ejemplo - Crear juego:**
```bash
POST /juegos
Content-Type: application/json

{
  "nombre": "Cyberpunk 2077",
  "genero": "RPG",
  "desarrollador": "CD Projekt RED"
}
```

### 🏆 Partidas (`/partidas`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/partidas` | Obtener todas las partidas |
| GET | `/partidas?juego=1` | Filtrar partidas por juego |
| GET | `/partidas?jugador=2` | Filtrar partidas por jugador |
| GET | `/partidas?fecha=2024-01-15` | Filtrar partidas por fecha |
| GET | `/partidas/:id` | Obtener partida por ID |
| POST | `/partidas` | Crear nueva partida |
| PUT | `/partidas/:id` | Actualizar partida |
| DELETE | `/partidas/:id` | Eliminar partida |

**Ejemplo - Crear partida:**
```bash
POST /partidas
Content-Type: application/json

{
  "idJuego": 1,
  "jugadores": [1, 2, 3],
  "fecha": "2024-01-18T20:00:00.000Z",
  "puntajes": {
    "1": 1000,
    "2": 850,
    "3": 920
  }
}
```

## 🔍 Ejemplos de Uso

### Obtener todos los usuarios
```bash
curl -X GET http://localhost:3000/usuarios
```

### Crear un nuevo juego
```bash
curl -X POST http://localhost:3000/juegos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Among Us",
    "genero": "Multijugador",
    "desarrollador": "InnerSloth"
  }'
```

### Buscar partidas de un jugador específico
```bash
curl -X GET "http://localhost:3000/partidas?jugador=1"
```

### Filtrar juegos por género
```bash
curl -X GET "http://localhost:3000/juegos?genero=FPS"
```

## ⚡ Validaciones

La API incluye validaciones completas:

- **IDs**: Deben ser números enteros positivos
- **Relaciones**: Los IDs referenciados deben existir
- **Nicknames**: Únicos, 3-50 caracteres, solo letras, números y guiones bajos
- **Nombres**: 2-200 caracteres
- **Fechas**: Formato ISO 8601 válido
- **Jugadores**: No puede haber duplicados en una partida
- **Puntajes**: Números no negativos

## 📝 Respuestas de la API

### Respuesta exitosa
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 4,
    "nombre": "Juan Pérez",
    "nickname": "JuanGamer",
    "juegosFavoritos": [1, 3]
  }
}
```

### Respuesta de error
```json
{
  "success": false,
  "error": "Usuario no encontrado",
  "message": "No existe un usuario con ID 999"
}
```

## 🗂️ Estructura del Proyecto

```
gaming-social-network-api/
├── app.js                 # Aplicación principal
├── config/
│   └── db.js             # Configuración (placeholder)
├── models/
│   ├── User.js           # Modelo de Usuario
│   ├── Game.js           # Modelo de Juego
│   └── Match.js          # Modelo de Partida
├── controllers/
│   ├── userController.js     # Controlador de usuarios
│   ├── gameController.js     # Controlador de juegos
│   └── matchController.js    # Controlador de partidas
├── routes/
│   ├── userRoutes.js     # Rutas de usuarios
│   ├── gameRoutes.js     # Rutas de juegos
│   └── matchRoutes.js    # Rutas de partidas
├── middleware/
│   ├── auth.js           # Autenticación (placeholder)
│   ├── errorHandler.js   # Manejo de errores
│   └── validate.js       # Validaciones
├── validators/
│   ├── userValidator.js  # Validador de usuarios
│   └── gameValidator.js  # Validador de juegos
├── tests/
│   └── game.test.js      # Tests (placeholder)
└── package.json
```

## 🧪 Testing

Para ejecutar las pruebas:
```bash
npm test
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor : Benjamin Ignacio Contreras Alvial (LegonBCA)

Desarrollado como ejemplo educativo para aprender APIs REST con Node.js

---

¡Diviértete explorando la API! 🎮✨ 
