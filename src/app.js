require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Importamos path para manejar rutas de carpetas
const app = express();

// 1. Middlewares globales
app.use(cors()); // Permite que tu HTML se comunique con la API
app.use(express.json()); // Permite recibir datos JSON en los POST

// 2. Archivos estáticos (Configuración robusta)
// Usamos path.join y __dirname para que Node busque la carpeta 'public' 
// que está un nivel arriba de la carpeta 'src'
app.use(express.static(path.join(__dirname, '../public')));

// 3. Rutas de la API
app.use('/api/auth',      require('./routes/auth.routes'));
app.use('/api/libros',    require('./routes/libros.routes'));
app.use('/api/usuarios',  require('./routes/usuarios.routes'));
app.use('/api/prestamos', require('./routes/prestamos.routes'));

// 4. Ruta base de la API (opcional, para verificar que el server vive)
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'LibraryAPI v1.0 - Backend funcionando' });
});

// 5. Middleware de errores (Siempre debe ir después de las rutas)
app.use(require('./middlewares/error.middleware'));

// 6. Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nServidor listo en: http://localhost:${PORT}`);
  console.log(`página web: http://localhost:${PORT}/index.html\n`);
});