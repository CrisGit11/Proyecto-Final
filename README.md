**Proyecto Orday**

Esta aplicación web permite a los usuarios generar rutinas personalizadas de aprendizaje a partir de sus intereses y disponibilidad. El usuario podrá visualizar su rutina semanal y modificarla, tal y como lo desee en ese mismo momento.

A continuación, se detallará en profundidad las partes de mi aplicación web:

**Backend - Rutas de Autenticación:**

**POST /api/users/register**

Permite registrar nuevos usuarios a nuestra página de orday.

Ruta: http://localhost:4200/api/users/register

Request:

``` JSON
{
  "username": "cristina_orday",
  "name": "cristina perales",
  "email": "cristina_orday@gmail.com",
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
    "name": "cristina perales",
    "email": "cristina_orday@gmail.com",
    "password": "$2b$10$0YgpAmG244.hEOf2Y7/fg.cWI2XpQagE.UX4AsvtMGxjrr9HDrsce",
    "_id": "68139cabc271259630e7bb89",
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

**Rutas para la Creación de Rutinas:**

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

En el caso de que la tabla routine este vacía, devolverá el siguiente mensaje:

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

En el caso de querer crear una rutina ya existente en la bbdd, nos devolverá:

Response:

``` JSON
{
  "message": "Ya existe una rutina con los mismos detalles"
}
```

**PUT /api/events/:eventId**

Permite actualizar una rutina existente. 

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

**Frontend - Parte visual (Angular):**

**Pantalla Home**

En prime lugar, partimos desde la pantalla home, donde nos muestra una descripción de para qué sirve la página web y qué objetivos podemos conseguir con ella.

Si quieres crear una rutina diaria y personalizada, tenemos dos opciones: iniciar sesión o registrarte en la página.

Para poder realizar cualquier acción de estas, tenemos dos botones mediante los cuales, al pulsarlos, nos llevarán automáticamente a la ruta esperada.

![screen_home.png](capturasOrday/image.png)

**Pantalla Login**

Tras haber presionado el botón de iniciar sesión, automáticamente aparecerá la pantalla en la cual el usuario podrá introducir sus datos personales para acceder a la página web.

Tendremos dos input donde el usuario deberá introducir su nombre de usuario y su contraseña, pero en el caso de iniciar sesión sin rellenar estos datos, la página te mostrará que son campos obligatorios.

![screen_login.png](capturasOrday/image-1.png)

En el caso de haber llegado hasta esta pantalla, pero el usuario no se ha registrado antes en Orday, tiene la opción de poder registrarse.

**Pantalla Register**

Esta pantalla es similar a la del login, pero en esta, el usuario deberá de presentar más información para que pueda quedar guardada en la bbdd de orday y así en un futuro poder iniciar sesión sin necesidad de volverse a registrar.

En el mismo caso, si intentamos registrarnos sin datos rellenos, la página nos indicará la obligatoriedad de los mismos.

![screen_register.png](capturasOrday/image-2.png)

**Pantalla Dashboard**

**¡Importante!** Para acceder al resto de pantallas que indique a continuación, previamente el usuario ha tenido que registrarse o logearse, creandose así un token/guarda que es el encargado de dar paso a las siguientes pantallas.

La pantalla dashboard es como un home que encontraremos una vez dentro de Orday. En ella, podemos crear las rutinas que deseemos o revisar nuestro perfil.

![screen_dashboard.png](capturasOrday/image-3.png)

En el caso de querer visitar nuestro perfil, presionamos en la barra de navegación, donde pone Perfil. Pero si en vez de eso, queremos crear una rutina, presionaremos el botón de crear rutina.

**Pantalla Profile**

![screen_profile.png](capturasOrday/image-4.png)

En esta pantalla visualizaremos los datos de la persona que se ha logeado o registrado a Orday, pudiendo así cambiar su contraseña o editar el perfil.

En el caso de querer cambiar la contraseña, pulsamos el botón y nos aparecerá una pantalla emergente donde le indicaremos la nueva contraseña.

![screen_profile2.png](capturasOrday/image-5.png)

**Pantalla Routine**

Para acceder a la creación de la rutina, lo podemos hacer o bien desde la pantalla dashboard, presionando el botón, o bien desde la opción "planificador" de la barra de navegación.

Aquí indicaremos los datos necesarios para poder crear una rutina, como por ejemplo, un título con una descripción y duración.

![screen_routine.png](capturasOrday/image-6.png)

Como por ejemplo:

![screen_routine2.png](capturasOrday/image-7.png)

Y automáticamente al darle guardar, nos aparecerá la rutina creada en nuestra pantalla dashboard.

**Pantalla Dashboard con rutina creada**

![screen_dashboard2.png](capturasOrday/image-8.png)

Una vez creada la rutina, tenemos la opción de poder editarla o directamente eliminarla.

Si lo que queremos es editarla, nos aparecerán pantallas emergentes donde nos solicitarán la nueva información. Y una vez realizado el proceso, nos aparecerá la rutina con los datos actualizados.

![screen_dashboard3.png](capturasOrday/image-9.png)
![screen_dashboard4.png](capturasOrday/image-10.png)

En el caso de querer eliminar la rutina, nos aparecerá una ventana donde tendremos que confirmar o cancelar la acción a realizar. Y según lo que elijamos, desaparecerá la rutina de nuestra pantalla o no.

![screen_dashboard5.png](capturasOrday/image-11.png)

**Tecnologías utilizadas:**

Para la parde del backend, he utilizado Node.js + Express para la autenticación de los usuarios y poder realizar la conexión con la base de datos de MongoDB.

Y para la parte de frontend, he utilizado Angular, HTML, CSS y JavaScript para las distintas partes del proyecto.

