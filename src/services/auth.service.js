const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

const register = async (nombre, correo, password) => {
  const existe = await db.get('SELECT id FROM usuarios WHERE correo = ?', [correo]);
  if (existe) {
    const err = new Error('El correo ya está registrado'); err.status = 409; throw err;
  }
  const hash = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  const createdAt = new Date().toISOString();
  
  // ORDEN CORRECTO: [id, nombre, correo, hash, createdAt]
  await db.run(
    'INSERT INTO usuarios (id, nombre, correo, password, activo, createdAt) VALUES (?,?,?,?,1,?)',
    [id, nombre, correo, hash, createdAt] 
  );
  
  const token = jwt.sign({ id, correo }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
  return { id, nombre, correo, token };
};

const login = async (correo, password) => {
  const usuario = await db.get('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
    const err = new Error('Correo o contraseña incorrectos'); err.status = 401; throw err;
  }
  if (!usuario.activo) {
    const err = new Error('Usuario inactivo'); err.status = 401; throw err;
  }
  const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
  return { token, usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } };
};

module.exports = { register, login };
