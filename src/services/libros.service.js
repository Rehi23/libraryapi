const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

const getAll = () => db.all('SELECT * FROM libros WHERE activo = 1');

const getById = async (id) => {
  const libro = await db.get('SELECT * FROM libros WHERE id = ? AND activo = 1', [id]);
  if (!libro) { const err = new Error('Libro no encontrado'); err.status = 404; throw err; }
  return libro;
};

const create = async (datos) => {
  const { titulo, autor, isbn, genero = null, stock = 0 } = datos;
  const existe = await db.get('SELECT id FROM libros WHERE isbn = ?', [isbn]);
  if (existe) { const err = new Error('Ya existe un libro con ese ISBN'); err.status = 409; throw err; }
  const id = uuidv4();
  const createdAt = new Date().toISOString();
  await db.run(
    'INSERT INTO libros (id, titulo, autor, isbn, genero, stock, activo, createdAt) VALUES (?,?,?,?,?,?,1,?)',
    [id, titulo, autor, isbn, genero, stock, createdAt]
  );
  return db.get('SELECT * FROM libros WHERE id = ?', [id]);
};

const update = async (id, datos) => {
  const libro = await db.get('SELECT * FROM libros WHERE id = ? AND activo = 1', [id]);
  if (!libro) { const err = new Error('Libro no encontrado'); err.status = 404; throw err; }
  const campos = { ...libro, ...datos };
  await db.run(
    'UPDATE libros SET titulo=?, autor=?, isbn=?, genero=?, stock=? WHERE id=?',
    [campos.titulo, campos.autor, campos.isbn, campos.genero, campos.stock, id]
  );
  return db.get('SELECT * FROM libros WHERE id = ?', [id]);
};

const remove = async (id) => {
  const libro = await db.get('SELECT * FROM libros WHERE id = ? AND activo = 1', [id]);
  if (!libro) { const err = new Error('Libro no encontrado'); err.status = 404; throw err; }
  await db.run('UPDATE libros SET activo = 0 WHERE id = ?', [id]);
};

module.exports = { getAll, getById, create, update, remove };
