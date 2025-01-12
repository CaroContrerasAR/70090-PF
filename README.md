# Proyecto Adoptme - Documentación

## Descripción

Este proyecto es parte de la aplicación **Adoptme** creada por Carolina Contreras. Se utiliza para gestionar usuarios y mascotas mediante una serie de endpoints para generar datos de prueba y almacenarlos en una base de datos MongoDB. Este proyecto hace uso de varias tecnologías modernas para el desarrollo de aplicaciones backend.

## Tecnologías Utilizadas

### Dependencias

- **@faker-js/faker**: Librería para generar datos falsos (mocking).
- **bcrypt**: Librería para encriptar contraseñas de usuarios.
- **cookie-parser**: Middleware para analizar cookies en solicitudes HTTP.
- **express**: Framework web para Node.js.
- **jsonwebtoken**: Librería para generar y verificar tokens JWT para autenticación.
- **mongoose**: ODM para MongoDB en Node.js.
- **multer**: Middleware para manejo de archivos (subida de archivos).
- **supertest**: Herramienta para pruebas HTTP de integración.

### Dependencias de Desarrollo

- **chai**: Librería para aserciones en pruebas.
- **mocha**: Framework de pruebas para JavaScript.
- **nodemon**: Herramienta que reinicia el servidor automáticamente durante el desarrollo.

## Instalación

1. Clona el repositorio:

   git clone <repositorio_url>
   cd <nombre_del_proyecto>

2. Instala las dependencias:
    npm install

3. Asegúrate de tener MongoDB en funcionamiento o utiliza un servicio en la nube para la base de datos.

## Scripts

- **start**: Inicia la aplicación en producción.

npm start

- **dev**: Inicia la aplicación en modo desarrollo, con reinicios automáticos utilizando nodemon.

npm run dev

- **test**: Ejecuta las pruebas definidas en el archivo test/supertest.test.js.

npm run test

## Perfil y Recursos en DockerHub
-   **Perfil DockerHub:**\
<https://hub.docker.com/u/carocontrerasar>
-   **Recursos DockerHub:**\
<https://hub.docker.com/repository/docker/carocontrerasar/70090-pf>
-   **Imagen Publica en DockerHub:**\
<https://hub.docker.com/repository/docker/carocontrerasar/70090-pf/general>

## Endpoints
El proyecto tiene los siguientes endpoints bajo la ruta base /api/mocks:

1. GET /api/mocks/mockingusers
Genera **50 usuarios** ficticios con los siguientes datos:

- **password**: Encriptada con la contraseña "coder123".
- **role**: Puede ser "user" o "admin".
- **pets**: Array vacío.

2. POST /api/mocks/generateData
Genera e inserta usuarios y mascotas en la base de datos. Recibe los siguientes parámetros:

- **users**: Número de usuarios a generar.
- **pets**: Número de mascotas a generar.

3. GET /api/mocks/mockingpets
Genera mascotas ficticias para ser utilizadas en la base de datos.

## Encriptación de Contraseña
Para encriptar las contraseñas de los usuarios, utilizamos bcryptjs. La contraseña "coder123" se encripta antes de ser almacenada en la base de datos.

## Contribución
Haz un fork del repositorio.
Realiza tus cambios en una nueva rama.
Abre un pull request describiendo los cambios realizados.

## Licencia
Este proyecto está bajo la licencia ISC.

## Autor
Autor: El profe Mauricio