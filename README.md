Proyecto Orday

Esta aplicación web permite a los usuarios generar rutinas personalizadas de aprendizaje a partir de sus intereses y disponibilidad. El usuario podrá visualizar su rutina semanal y modificarla, tal y como lo desee en ese mismo momento.

A continuación, se detallará en profundidad las partes de nuestra aplicación web:

Backend - Rutas de Autenticación:

**POST /api/users/register**

Permite registrar nuevos usuarios a nuestra página de orday.

Ruta: http://localhost:4200/api/users/register

Request:

``` JSON
{
  "username": "cristina_orday",
  "password": "Orday2025"
}
```

Response:

``` JSON
{
  "success": true,
  "message": "El usuario se ha registrado correctamente",
  "data": {
    "username": "cristina_orday",
    "password": "$2b$10$RRMOjJLGHBw1KAZ3qDRAMe5UGGY3niQazWo462iQpnQNmZ5HxJk7y",
    "_id": "681108ecf815abe9fdf653d5",
    "__v": 0
  }
}
```
En el caso de intentar crear un usuario ya existente en la bbdd, nos dará esta respuesta.

Response:

```JSON
{
  "success": false,
  "message": "El usuario ya existe en la base de datos"
}
```

**POST /api/users/login**

Permite a los usuarios autenticarse para poder iniciar sesión.

Ruta: http://localhost:4200/api/users/login

Request:

``` JSON
{
  "username": "cristina_orday",
  "password": "Orday2025"
}
```

Response:

``` JSON
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjgxMTA4ZWNmODE1YWJlOWZkZjY1M2Q1IiwidXNlcl91c2VybmFtZSI6ImNyaXN0aW5hX29yZGF5IiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCRSUk1PakpMR0hCdzFLQVozcURSQU1lNVVHR1kzbmlRYXpXbzQ2MmlRcG5RTm1aNUh4Sms3eSIsImlhdCI6MTc0NTk0Njg5NywiZXhwIjoxNzQ1OTUwNDk3fQ.nSJd7NCMotQk9pihoAYjeoEbzA1Q9uS1qTy1eO2Ho0E"
}
```
En el caso de intentar iniciar sesión con un usuario que previamente no se ha registrado, devolverá la siguiente respuesta.

Request:

``` JSON
{
  "username": "carlos_orday",
  "password": "pasword"
}
```

Response:

``` JSON
{
  "success": false,
  "message": "El usuario indicado no existe"
}
```

**GET /api/users/profile**

Devuelve la información del usuario autenticado.

Ruta: http://localhost:4200/api/users/profile

En la parte de **Auth / Bearer** le indicamos el token generado anteriormente por el usuario.

``` JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjgxMTA4ZWNmODE1YWJlOWZkZjY1M2Q1IiwidXNlcl91c2VybmFtZSI6ImNyaXN0aW5hX29yZGF5IiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCRSUk1PakpMR0hCdzFLQVozcURSQU1lNVVHR1kzbmlRYXpXbzQ2MmlRcG5RTm1aNUh4Sms3eSIsImlhdCI6MTc0NTk0Njg5NywiZXhwIjoxNzQ1OTUwNDk3fQ.nSJd7NCMotQk9pihoAYjeoEbzA1Q9uS1qTy1eO2Ho0E"
}
```
Response:

``` JSON
{
  "success": true,
  "data": {
    "_id": "681108ecf815abe9fdf653d5",
    "username": "cristina_orday",
    "password": "$2b$10$RRMOjJLGHBw1KAZ3qDRAMe5UGGY3niQazWo462iQpnQNmZ5HxJk7y",
    "__v": 0
  }
}
```

Rutas para la Creación de Rutinas:

**GET /api/routine**

Devuelve una lista de todas las rutinas creadas. 

Ruta: http://localhost:4200/api/routine

Response:

``` JSON
{
  "message": "Mostrando el listado de todas las rutinas",
  "routines": [
    {
      "_id": "68110199e0f5b407bcd1880f",
      "name": "Mañana productiva",
      "description": "Es necesario recoger toda la ropa de mi dormitorio",
      "duration": "1 hora",
      "category": "Hogar",
      "organizer": [
        {
          "_id": "6810ae3a0b7d500fadbfe3ea",
          "username": "organizador1",
          "password": "$2b$10$stsyvGF5Ke7LevLdDo6Zm.EVxJO5E1W55ssyHO2gjc7DAo8kFv65i",
          "__v": 0
        }
      ],
      "__v": 0
    }
  ]
}
```

En el caso de que la tabla events este vacía, devolverá el siguiente mensaje:

Response:

``` JSON
{
  "success": false,
  "message": "No hay rutinas disponibles"
}
```

**POST /api/routine/generate**

Permite crear una nueva rutina.

Ruta: http://localhost:4200/api/routine/generate

Request:

``` JSON
{
  "name": "Tarde de spinning",
  "description": "Correr en la eliptica",
  "duration": "1 hora y media",
  "category": "Deporte"
}
```

Response:

``` JSON
{
  "message": "La rutina se ha creado correctamente",
  "routine": {
    "name": "Tarde de spinning",
    "description": "Correr en la eliptica",
    "duration": "1 hora y media",
    "category": "Deporte",
    "organizer": [
      "681108ecf815abe9fdf653d5"
    ],
    "_id": "68110a8df815abe9fdf653dd",
    "__v": 0
  }
}
```

En el caso de querer crear un evento ya existente en la bbdd, nos devolverá:

Response:

``` JSON
{
  "message": "Ya existe una rutina con los mismos detalles"
}
```

**PUT /api/events/:eventId**

Permite actualizar un evento existente. 

Ruta: http://localhost:4200/api/routine/68110a8df815abe9fdf653dd

Request:

``` JSON
{
  "name": "Tarde de spinning - actualizada",
  "description": "Correr en la eliptica y luego hacer ejercicios de fuerza",
  "duration": "2 horas",
  "category": "Deporte"
}
```

Response:

``` JSON
{
  "message": "Rutina actualizada con éxito",
  "data": {
    "_id": "68110a8df815abe9fdf653dd",
    "name": "Tarde de spinning - actualizada",
    "description": "Correr en la eliptica y luego hacer ejercicios de fuerza",
    "duration": "2 horas",
    "category": "Deporte",
    "organizer": [
      "681108ecf815abe9fdf653d5"
    ],
    "__v": 0
  }
}
```

**DELETE /api/routine/:eventId**

Elimina una rutina específica.

Ruta: http://localhost:4200/api/routine/68110a8df815abe9fdf653dd

Response:

``` JSON
{
  "message": "Rutina eliminada con éxito"
}
```

