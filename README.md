# LibraryAPI - Sistema de Gestión de Biblioteca
Este es un sistema completo de gestión de bibliotecas que incluye un Backend robusto desarrollado con Node.js y SQLite, y un Frontend administrativo moderno e integrado.

## Características
Gestión de Libros: CRUD completo para el registro, visualización, edición y baja lógica de inventario.

Control de Usuarios: Sistema de registro (Auth) y directorio de usuarios activos.

Módulo de Préstamos: Registro de préstamos y devoluciones con control automático de stock en tiempo real.

Seguridad: Autenticación y autorización mediante JWT (JSON Web Tokens).

Base de Datos: SQLite3 configurado con modo WAL para alta disponibilidad y velocidad.

## Tecnologías utilizadas
Backend: Node.js v20+, Express, SQLite3, BcryptJS, JWT, Express-validator.

Frontend: HTML5, CSS3 (Custom Properties & Grid), JavaScript Vanilla (Fetch API).

## Instalación y uso
Clonar el repositorio y entrar a la carpeta:

Bash
git clone https://github.com/Rehi23/libraryapi.git
cd libraryapi
Instalar dependencias:

Bash
npm install
Configurar variables de entorno:
Crea un archivo .env en la raíz basado en el archivo .env.example con el siguiente contenido:

Fragmento de código
PORT=3000
JWT_SECRET=tu_clave_secreta_aqui
DB_PATH=./database.db
Iniciar el servidor en modo desarrollo (usando nodemon):

Bash
npm run dev
Acceder a la interfaz:
Abre http://localhost:3000/index.html en tu navegador para usar el Dashboard.
