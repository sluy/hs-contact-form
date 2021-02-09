# Formulario de contacto

## Cliente

Ir a la ruta `./client` y correr el comando `ng serve` para levantar el ambiente de desarrollo.

Navegar a `http://localhost:4200/` para entrar al cliente visual.

### Configuración

En el archivo `./client/src/app/config.ts` está la configuración del cliente.

Por el momento sólo la propiedad `api.url` para establecer la url de la api.

## Servidor

El servidor está implementado con nodejs y express (a pedido) y typescript para conservar paridad con el ambiente del cliente.

### Iniciar servidor

Ir a la ruta `./server` y correr el comando `npm start` para levantar el ambiente de desarrollo del servidor.

Para iniciar el servidor dev con hot-reload (nodemon), correr el comando `npm run dev`.

### Configuración de la Base de datos

Actualmente el sistema usando MySQL cómo motor de base de datos, sin embargo al usar el ORM `TypeORM` se puede replantear.

Para configurar la base de datos sólo resta editar el archivo `./server/ormconfig.json` con los datos de la base de datos a usar (base de datos, nombre de usuario, contraseña, etc...).

Por defecto las tablas (en este caso una sola) se levantará automáticamente al iniciar el servidor; sin embargo está anexo el archivo `./server/database.sql` con datos demo.

### Rutas

Dentro de las rutas sólo consta de

`http://localhost:3000` Página principal de la api.

`http://localhost:3000/categories` (get) Categorías disponibles.

`http://localhost:3000/messages` (post) Para el almacenado de mensajes.

### Seguridad

El sistema tiene algo de seguridad por el lado del servidor sólo añadida cómo ejemplo y a razón "semi manual" (por más validaciones en el front, siempre el back debe estar respaldado).

## Idioma y comentarios

Por costumbre (de trabajar con multiples cliente) el back estaba empezándolo a comentar en ingles; el front si está comentado en español.

## Contacto

sluy1283@gmail.com
