# 🧪 Guía Completa de Pruebas en Postman
## API Red Social de Juegos

### 📋 Requisitos Previos
- ✅ Postman instalado
- ✅ Servidor corriendo (`npm start`)
- ✅ Colección importada (`Postman_Collection.json`)

---

## 🚀 FASE 1: CONFIGURACIÓN Y VERIFICACIÓN

### 🔧 Paso 1: Configurar Environment (Opcional pero Recomendado)
1. **Click en el ícono de configuración** (⚙️) en Postman
2. **Environments** → **Add**
3. **Nombre**: `Gaming API Local`
4. **Variables**:
   - Variable: `base_url` | Value: `http://localhost:3000`
   - Variable: `user_id` | Value: `1`
   - Variable: `game_id` | Value: `1`
5. **Save** y **selecciona el environment** en el dropdown superior

### ✅ Paso 2: Verificar Conectividad
**Endpoint**: `GET {{base_url}}/`
1. Ve a: `🏠 Welcome` → `Get API Info`
2. **Click "Send"**
3. **✅ Resultado esperado**:
```json
{
    "mensaje": "Bienvenido a la API de Red Social de Juegos",
    "version": "1.0.0",
    "rutas": {
        "usuarios": "/usuarios",
        "juegos": "/juegos",
        "partidas": "/partidas"
    }
}
```

---

## 📊 FASE 2: EXPLORAR DATOS EXISTENTES

### ✅ Paso 3: Ver Todos los Usuarios
**Endpoint**: `GET {{base_url}}/usuarios`
1. Ve a: `👤 Usuarios` → `Get All Users`
2. **Click "Send"**
3. **✅ Resultado esperado**:
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 1,
            "nombre": "Ana García",
            "nickname": "AnaGamer",
            "juegosFavoritos": [1, 2]
        },
        {
            "id": 2,
            "nombre": "Carlos López",
            "nickname": "CarlosGG",
            "juegosFavoritos": [1, 3]
        },
        {
            "id": 3,
            "nombre": "María González",
            "nickname": "MaryPlayer",
            "juegosFavoritos": [2, 3]
        }
    ]
}
```

### ✅ Paso 4: Ver Todos los Juegos
**Endpoint**: `GET {{base_url}}/juegos`
1. Ve a: `🎮 Juegos` → `Get All Games`
2. **Click "Send"**
3. **✅ Resultado esperado**:
```json
{
    "success": true,
    "count": 4,
    "data": [
        {
            "id": 1,
            "nombre": "The Legend of Zelda: Breath of the Wild",
            "genero": "Aventura",
            "desarrollador": "Nintendo"
        },
        {
            "id": 2,
            "nombre": "Counter-Strike 2",
            "genero": "FPS",
            "desarrollador": "Valve"
        },
        {
            "id": 3,
            "nombre": "Minecraft",
            "genero": "Sandbox",
            "desarrollador": "Mojang Studios"
        },
        {
            "id": 4,
            "nombre": "Overwatch 2",
            "genero": "FPS",
            "desarrollador": "Blizzard Entertainment"
        }
    ]
}
```

### ✅ Paso 5: Ver Todas las Partidas
**Endpoint**: `GET {{base_url}}/partidas`
1. Ve a: `🏆 Partidas` → `Get All Matches`
2. **Click "Send"**
3. **✅ Resultado esperado**:
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 1,
            "idJuego": 1,
            "jugadores": [1, 2],
            "fecha": "2024-01-15T14:30:00.000Z",
            "puntajes": {
                "1": 850,
                "2": 720
            }
        },
        {
            "id": 2,
            "idJuego": 2,
            "jugadores": [2, 3],
            "fecha": "2024-01-16T16:45:00.000Z",
            "puntajes": {
                "2": 1200,
                "3": 980
            }
        },
        {
            "id": 3,
            "idJuego": 3,
            "jugadores": [1, 2, 3],
            "fecha": "2024-01-17T10:15:00.000Z",
            "puntajes": {
                "1": 500,
                "2": 750,
                "3": 600
            }
        }
    ]
}
```

### ✅ Paso 6: Ver Usuario Específico
**Endpoint**: `GET {{base_url}}/usuarios/1`
1. Ve a: `👤 Usuarios` → `Get User by ID`
2. **Verifica URL**: `http://localhost:3000/usuarios/1`
3. **Click "Send"**
4. **✅ Resultado esperado**:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "nombre": "Ana García",
        "nickname": "AnaGamer",
        "juegosFavoritos": [1, 2]
    }
}
```

---

## ➕ FASE 3: CREAR NUEVOS RECURSOS

### ✅ Paso 7: Crear Usuario Nuevo
**Endpoint**: `POST {{base_url}}/usuarios`
1. Ve a: `👤 Usuarios` → `Create New User`
2. **Headers**: 
   - `Content-Type: application/json` (ya configurado)
3. **Body (raw, JSON)**:
```json
{
    "nombre": "Laura Fernández",
    "nickname": "LauraGamer",
    "juegosFavoritos": [1, 3, 4]
}
```
4. **Click "Send"**
5. **✅ Resultado esperado**:
```json
{
    "success": true,
    "message": "Usuario creado exitosamente",
    "data": {
        "id": 4,
        "nombre": "Laura Fernández",
        "nickname": "LauraGamer",
        "juegosFavoritos": [1, 3, 4]
    }
}
```
6. **📝 Anota el ID**: `4` (lo usaremos después)

### ✅ Paso 8: Crear Juego Nuevo
**Endpoint**: `POST {{base_url}}/juegos`
1. Ve a: `🎮 Juegos` → `Create New Game`
2. **Headers**: `Content-Type: application/json`
3. **Body (raw, JSON)**:
```json
{
    "nombre": "Valorant",
    "genero": "FPS",
    "desarrollador": "Riot Games"
}
```
4. **Click "Send"**
5. **✅ Resultado esperado**:
```json
{
    "success": true,
    "message": "Juego creado exitosamente",
    "data": {
        "id": 5,
        "nombre": "Valorant",
        "genero": "FPS",
        "desarrollador": "Riot Games"
    }
}
```
6. **📝 Anota el ID**: `5`

### ✅ Paso 9: Crear Partida Nueva
**Endpoint**: `POST {{base_url}}/partidas`
1. Ve a: `🏆 Partidas` → `Create New Match`
2. **Headers**: `Content-Type: application/json`
3. **Body (raw, JSON)**:
```json
{
    "idJuego": 2,
    "jugadores": [1, 2, 4],
    "fecha": "2024-01-20T15:30:00.000Z",
    "puntajes": {
        "1": 1400,
        "2": 1100,
        "4": 1250
    }
}
```
4. **Click "Send"**
5. **✅ Resultado esperado**:
```json
{
    "success": true,
    "message": "Partida creada exitosamente",
    "data": {
        "id": 4,
        "idJuego": 2,
        "jugadores": [1, 2, 4],
        "fecha": "2024-01-20T15:30:00.000Z",
        "puntajes": {
            "1": 1400,
            "2": 1100,
            "4": 1250
        }
    }
}
```
6. **📝 Anota el ID**: `4`

---

## 🔍 FASE 4: FILTROS Y BÚSQUEDAS

### ✅ Paso 10: Filtrar Juegos por Género
**Endpoint**: `GET {{base_url}}/juegos?genero=FPS`
1. Ve a: `🎮 Juegos` → `Get Games by Genre`
2. **Verifica Params**: `genero = FPS`
3. **Click "Send"**
4. **✅ Resultado esperado**:
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 2,
            "nombre": "Counter-Strike 2",
            "genero": "FPS",
            "desarrollador": "Valve"
        },
        {
            "id": 4,
            "nombre": "Overwatch 2",
            "genero": "FPS",
            "desarrollador": "Blizzard Entertainment"
        },
        {
            "id": 5,
            "nombre": "Valorant",
            "genero": "FPS",
            "desarrollador": "Riot Games"
        }
    ],
    "filtro": {
        "genero": "FPS"
    }
}
```

### ✅ Paso 11: Buscar Partidas por Jugador
**Endpoint**: `GET {{base_url}}/partidas?jugador=1`
1. Ve a: `🏆 Partidas` → `Get Matches by Player`
2. **Verifica Params**: `jugador = 1`
3. **Click "Send"**
4. **✅ Resultado esperado**: Todas las partidas donde participa el usuario 1

### ✅ Paso 12: Buscar Partidas por Juego
**Endpoint**: `GET {{base_url}}/partidas?juego=2`
1. Ve a: `🏆 Partidas` → `Get Matches by Game`
2. **Cambia Params**: `juego = 2`
3. **Click "Send"**
4. **✅ Resultado esperado**: Todas las partidas del juego 2 (Counter-Strike)

### ✅ Paso 13: Buscar Partidas por Fecha
**Endpoint**: `GET {{base_url}}/partidas?fecha=2024-01-15`
1. Ve a: `🏆 Partidas` → `Get Matches by Date`
2. **Verifica Params**: `fecha = 2024-01-15`
3. **Click "Send"**
4. **✅ Resultado esperado**: Partidas del 15 de enero

---

## ✏️ FASE 5: ACTUALIZAR RECURSOS

### ✅ Paso 14: Actualizar Usuario
**Endpoint**: `PUT {{base_url}}/usuarios/4`
1. Ve a: `👤 Usuarios` → `Update User`
2. **Verifica URL**: `http://localhost:3000/usuarios/4`
3. **Headers**: `Content-Type: application/json`
4. **Body (raw, JSON)**:
```json
{
    "nombre": "Laura Fernández Gómez",
    "nickname": "LauraProGamer",
    "juegosFavoritos": [1, 2, 3, 4, 5]
}
```
5. **Click "Send"**
6. **✅ Resultado esperado**: Usuario actualizado con nuevos datos

### ✅ Paso 15: Actualizar Juego
**Endpoint**: `PUT {{base_url}}/juegos/5`
1. Ve a: `🎮 Juegos` → `Update Game`
2. **Verifica URL**: `http://localhost:3000/juegos/5`
3. **Body (raw, JSON)**:
```json
{
    "nombre": "Valorant",
    "genero": "Tactical FPS",
    "desarrollador": "Riot Games"
}
```
4. **Click "Send"**
5. **✅ Resultado esperado**: Juego actualizado

### ✅ Paso 16: Actualizar Partida (Solo Puntajes)
**Endpoint**: `PUT {{base_url}}/partidas/4`
1. Ve a: `🏆 Partidas` → `Update Match`
2. **Verifica URL**: `http://localhost:3000/partidas/4`
3. **Body (raw, JSON)**:
```json
{
    "puntajes": {
        "1": 1500,
        "2": 1200,
        "4": 1350
    }
}
```
4. **Click "Send"**
5. **✅ Resultado esperado**: Partida con puntajes actualizados

---

## ❌ FASE 6: PROBAR VALIDACIONES DE ERROR

### ✅ Paso 17: Error - Nickname Duplicado
**Endpoint**: `POST {{base_url}}/usuarios`
1. Ve a: `👤 Usuarios` → `❌ Create User - Invalid Nickname`
2. **Body (raw, JSON)**:
```json
{
    "nombre": "Test User",
    "nickname": "AnaGamer",
    "juegosFavoritos": [1]
}
```
3. **Click "Send"**
4. **✅ Error esperado (400)**:
```json
{
    "success": false,
    "error": "Nickname ya existe",
    "message": "El nickname \"AnaGamer\" ya está en uso"
}
```

### ✅ Paso 18: Error - Juego Inexistente en Partida
**Endpoint**: `POST {{base_url}}/partidas`
1. Ve a: `🏆 Partidas` → `❌ Create Match - Invalid Game`
2. **Body (raw, JSON)**:
```json
{
    "idJuego": 999,
    "jugadores": [1, 2],
    "fecha": "2024-01-18T20:00:00.000Z",
    "puntajes": {
        "1": 1500,
        "2": 1200
    }
}
```
3. **Click "Send"**
4. **✅ Error esperado (400)**:
```json
{
    "success": false,
    "error": "Juego no válido",
    "message": "El juego con ID 999 no existe"
}
```

### ✅ Paso 19: Error - ID Inválido
**Endpoint**: `GET {{base_url}}/usuarios/abc`
1. Ve a: `👤 Usuarios` → `Get User by ID`
2. **Cambia URL** a: `http://localhost:3000/usuarios/abc`
3. **Click "Send"**
4. **✅ Error esperado (400)**:
```json
{
    "success": false,
    "error": "ID inválido",
    "message": "El ID debe ser un número válido"
}
```

### ✅ Paso 20: Error - Usuario No Encontrado
**Endpoint**: `GET {{base_url}}/usuarios/999`
1. **Cambia URL** a: `http://localhost:3000/usuarios/999`
2. **Click "Send"**
3. **✅ Error esperado (404)**:
```json
{
    "success": false,
    "error": "Usuario no encontrado",
    "message": "No existe un usuario con ID 999"
}
```

### ✅ Paso 21: Error - Datos Faltantes
**Endpoint**: `POST {{base_url}}/usuarios`
1. **Body vacío o incompleto**:
```json
{
    "nombre": "Test"
}
```
2. **Click "Send"**
3. **✅ Error esperado (400)**:
```json
{
    "success": false,
    "error": "Datos requeridos faltantes",
    "message": "Los campos nombre y nickname son obligatorios"
}
```

### ✅ Paso 22: Error - Jugador Inexistente en Partida
**Endpoint**: `POST {{base_url}}/partidas`
1. **Body**:
```json
{
    "idJuego": 1,
    "jugadores": [999],
    "puntajes": {
        "999": 100
    }
}
```
2. **Click "Send"**
3. **✅ Error esperado (400)**:
```json
{
    "success": false,
    "error": "Jugador no válido",
    "message": "El usuario con ID 999 no existe"
}
```

### ✅ Paso 23: Error - Jugadores Duplicados
**Endpoint**: `POST {{base_url}}/partidas`
1. **Body**:
```json
{
    "idJuego": 1,
    "jugadores": [1, 1, 2],
    "puntajes": {
        "1": 100,
        "2": 200
    }
}
```
2. **Click "Send"**
3. **✅ Error esperado (400)**:
```json
{
    "success": false,
    "error": "Jugadores duplicados",
    "message": "No puede haber jugadores duplicados en una partida"
}
```

---

## 🗑️ FASE 7: ELIMINAR RECURSOS

### ✅ Paso 24: Eliminar Partida
**Endpoint**: `DELETE {{base_url}}/partidas/4`
1. Ve a: `🏆 Partidas` → `Delete Match`
2. **Verifica URL**: `http://localhost:3000/partidas/4`
3. **Click "Send"**
4. **✅ Resultado esperado**:
```json
{
    "success": true,
    "message": "Partida eliminada exitosamente",
    "data": {
        "id": 4,
        "idJuego": 2,
        "jugadores": [1, 2, 4],
        "fecha": "2024-01-20T15:30:00.000Z",
        "puntajes": {
            "1": 1500,
            "2": 1200,
            "4": 1350
        }
    }
}
```

### ✅ Paso 25: Verificar Eliminación
**Endpoint**: `GET {{base_url}}/partidas`
1. Ve a: `🏆 Partidas` → `Get All Matches`
2. **Click "Send"**
3. **✅ Verificar**: La partida ID 4 ya no debería aparecer

### ✅ Paso 26: Eliminar Juego
**Endpoint**: `DELETE {{base_url}}/juegos/5`
1. Ve a: `🎮 Juegos` → `Delete Game`
2. **Verifica URL**: `http://localhost:3000/juegos/5`
3. **Click "Send"**
4. **✅ Resultado esperado**: Juego Valorant eliminado

### ✅ Paso 27: Eliminar Usuario
**Endpoint**: `DELETE {{base_url}}/usuarios/4`
1. Ve a: `👤 Usuarios` → `Delete User`
2. **Verifica URL**: `http://localhost:3000/usuarios/4`
3. **Click "Send"**
4. **✅ Resultado esperado**: Usuario Laura eliminado

---

## 🎯 FASE 8: VERIFICACIÓN FINAL

### ✅ Paso 28: Estado Final de Datos
1. **GET `/usuarios`** - Debería mostrar solo usuarios 1, 2, 3
2. **GET `/juegos`** - Debería mostrar solo juegos 1, 2, 3, 4
3. **GET `/partidas`** - Debería mostrar solo partidas 1, 2, 3

---

## 📊 CHECKLIST COMPLETO

### 🔗 Conectividad
- [ ] ✅ GET `/` - Información API

### 📖 Operaciones READ
- [ ] ✅ GET `/usuarios` - Todos los usuarios
- [ ] ✅ GET `/juegos` - Todos los juegos
- [ ] ✅ GET `/partidas` - Todas las partidas
- [ ] ✅ GET `/usuarios/1` - Usuario específico

### ➕ Operaciones CREATE
- [ ] ✅ POST `/usuarios` - Crear usuario
- [ ] ✅ POST `/juegos` - Crear juego
- [ ] ✅ POST `/partidas` - Crear partida

### 🔍 Filtros y Búsquedas
- [ ] ✅ GET `/juegos?genero=FPS` - Filtrar por género
- [ ] ✅ GET `/partidas?jugador=1` - Partidas por jugador
- [ ] ✅ GET `/partidas?juego=2` - Partidas por juego
- [ ] ✅ GET `/partidas?fecha=2024-01-15` - Partidas por fecha

### ✏️ Operaciones UPDATE
- [ ] ✅ PUT `/usuarios/4` - Actualizar usuario
- [ ] ✅ PUT `/juegos/5` - Actualizar juego
- [ ] ✅ PUT `/partidas/4` - Actualizar partida

### ❌ Validaciones de Error
- [ ] ✅ Nickname duplicado (Error 400)
- [ ] ✅ Juego inexistente (Error 400)
- [ ] ✅ ID inválido (Error 400)
- [ ] ✅ Usuario no encontrado (Error 404)
- [ ] ✅ Datos faltantes (Error 400)
- [ ] ✅ Jugador inexistente (Error 400)
- [ ] ✅ Jugadores duplicados (Error 400)

### 🗑️ Operaciones DELETE
- [ ] ✅ DELETE `/partidas/4` - Eliminar partida
- [ ] ✅ DELETE `/juegos/5` - Eliminar juego
- [ ] ✅ DELETE `/usuarios/4` - Eliminar usuario

---

## 🚨 Troubleshooting

### Problema: "Connection refused"
**Solución**: Verificar que el servidor esté corriendo:
```bash
npm start
```

### Problema: Puerto ocupado
**Solución**: Matar procesos Node.js:
```bash
taskkill /f /im node.exe
```

### Problema: Error 404 en todas las rutas
**Solución**: Verificar que las rutas estén importadas correctamente en `app.js`

### Problema: Error 400 "JSON malformado"
**Solución**: Verificar sintaxis JSON (comas, llaves, comillas)

---

## 🎉 ¡Felicitaciones!

Si completaste todas las pruebas, has verificado exitosamente:
- ✅ **CRUD completo** para todas las entidades
- ✅ **Filtros y búsquedas** avanzadas
- ✅ **Validaciones** robustas
- ✅ **Manejo de errores** apropiado
- ✅ **Relaciones** entre entidades

**¡Tu API de Red Social de Juegos está 100% funcional!** 🎮✨ 