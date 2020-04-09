## Autentificación
### Registarse
``POST /auth/register``  
Crea un usuario y genera un token. Tiene un *middleware* para comprobar si la contraseña coincide con la expresión regular.
##### Body
* ``name``.
* ``email``: debe de ser único.
* ``password``: la contraseña original se encripta.
* ``description?``.
* ``avatar``.  

### Login
``POST /auth/login``  
Loguea un usuario con la contraseña sin encriptar, es decir, usa la contraseña original para que después haga la comparación con la contraseña encriptada. Tiene un *middleware* para comprobar si la contraseña coincide con la expresión regular.
##### Body
* ``email``: debe de ser único.
* ``password``: la contraseña original sin encriptar.

### Comprobar si está logueado
``GET /auth/is-logged``  
Pasa por un middleware para compruebar si el token del usuario es válido.
##### Headers
* ``Authorization``: *Bearer eGciO...*.