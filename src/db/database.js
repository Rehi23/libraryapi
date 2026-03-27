const path = require('path');
require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.resolve(process.env.DB_PATH || './database.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) { console.error('Error al conectar BD:', err); process.exit(1); }
  console.log('Base de datos conectada:', DB_PATH);
});

// Activar foreign keys
db.run('PRAGMA foreign_keys = ON');
db.run('PRAGMA journal_mode = WAL');

const run = (sql, params = []) =>
  new Promise((res, rej) =>
    db.run(sql, params, function(err) { err ? rej(err) : res(this); })
  );

const get = (sql, params = []) =>
  new Promise((res, rej) =>
    db.get(sql, params, (err, row) => err ? rej(err) : res(row))
  );

const all = (sql, params = []) =>
  new Promise((res, rej) =>
    db.all(sql, params, (err, rows) => err ? rej(err) : res(rows))
  );

// Crear tablas
const init = async () => {
  await run(`CREATE TABLE IF NOT EXISTS usuarios (
    id        TEXT PRIMARY KEY,
    nombre    TEXT NOT NULL,
    correo    TEXT NOT NULL UNIQUE,
    password  TEXT NOT NULL,
    telefono  TEXT,
    activo    INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS libros (
    id        TEXT PRIMARY KEY,
    titulo    TEXT NOT NULL,
    autor     TEXT NOT NULL,
    isbn      TEXT NOT NULL UNIQUE,
    genero    TEXT,
    stock     INTEGER NOT NULL DEFAULT 0,
    activo    INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS prestamos (
    id              TEXT PRIMARY KEY,
    usuarioId       TEXT NOT NULL,
    libroId         TEXT NOT NULL,
    fechaPrestamo   TEXT NOT NULL,
    fechaLimite     TEXT NOT NULL,
    fechaDevolucion TEXT,
    estado          TEXT NOT NULL DEFAULT 'activo',
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
    FOREIGN KEY (libroId)   REFERENCES libros(id)
  )`);
};

init().catch(err => { console.error('Error al inicializar BD:', err); process.exit(1); });

module.exports = { run, get, all };
