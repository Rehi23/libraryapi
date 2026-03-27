# LibraryAPI - Sistema de Gestión de Biblioteca

Este es un sistema completo de gestión de bibliotecas que incluye un **Backend** robusto desarrollado con **Node.js** y **SQLite**, y un **Frontend** administrativo moderno e integrado

## Características
- **Gestión de Libros**: CRUD completo para el registro, visualización, edición y baja lógica de inventario.
- **Control de Usuarios**: Sistema de registro (Auth) y directorio de usuarios activos.
- **Módulo de Préstamos**: Registro de préstamos y devoluciones con control automático de stock en tiempo real.
- **Seguridad**: Autenticación y autorización mediante **JWT (JSON Web Tokens)**.
- **Base de Datos**: SQLite3 configurado con modo WAL para alta disponibilidad y velocidad.

## Tecnologías utilizadas
- **Backend**: Node.js v20+, Express 4.x, SQLite3, BcryptJS, JWT, Express-validator.
- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla (Fetch API).

## Instalación y uso

1. **Clonar el repositorio** y entrar a la carpeta:
   ```bash
   git clone [https://github.com/Rehi23/libraryapi.git]
   cd libraryapi
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz con el siguiente contenido:
   ```env
   PORT=3000
   JWT_SECRET=tu_clave_secreta_aqui
   DB_PATH=./database.db
   ```

4. **Iniciar el servidor** en modo desarrollo (usando nodemon):
   ```bash
   npm run dev
   ```

5. **Acceder a la interfaz**:
   Abre `http://localhost:3000/index.html` en tu navegador para usar el Dashboard.

## Evidencias de la colección en postman de los enpoints:
   Abre `https://go.postman.co/workspace/4fb772b9-957f-438d-8d23-62162472ed2c/collection/47507155-f564501d-b38c-458c-aa1a-36d07a2ddff2` en tu navegador.
   Para observar la colección y tomar un ejemplo de ello.

## Resumen de Endpoints Principales

La API está organizada por recursos y protegida mediante **JWT**.

| Recurso | Método | Ruta | Descripción |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Registro de nuevos usuarios. |
| **Auth** | `POST` | `/api/auth/login` | Inicio de sesión y obtención de Token. |
| **Libros** | `GET` | `/api/libros` | Listar todo el catálogo disponible. |
| **Libros** | `POST` | `/api/libros` | Registrar un nuevo ejemplar. |
| **Usuarios**| `GET` | `/api/usuarios` | Listar usuarios activos en el sistema. |
| **Préstamos**| `POST` | `/api/prestamos` | Registrar préstamo (decrementa stock -1). |
| **Préstamos**| `PATCH`| `/api/prestamos/:id/devolver` | Registrar devolución (incrementa stock +1). |
