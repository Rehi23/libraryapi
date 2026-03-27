const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');

const getAll = (estado) => estado
  ? db.all('SELECT * FROM prestamos WHERE estado=?', [estado])
  : db.all('SELECT * FROM prestamos');

const getById = async (id) => {
  const p = await db.get('SELECT * FROM prestamos WHERE id=?', [id]);
  if (!p) { const err = new Error('Préstamo no encontrado'); err.status = 404; throw err; }
  return p;
};

const create = async (usuarioId, libroId, fechaLimite) => {
  const usuario = await db.get('SELECT * FROM usuarios WHERE id=? AND activo=1', [usuarioId]);
  if (!usuario) { const err = new Error('Usuario no encontrado o inactivo'); err.status = 404; throw err; }

  const libro = await db.get('SELECT * FROM libros WHERE id=? AND activo=1', [libroId]);
  if (!libro) { const err = new Error('Libro no encontrado'); err.status = 404; throw err; }
  if (libro.stock <= 0) { const err = new Error('No hay ejemplares disponibles de este libro'); err.status = 409; throw err; }

  const id = uuidv4();
  const fechaPrestamo = new Date().toISOString();

  await db.run(
    "INSERT INTO prestamos (id,usuarioId,libroId,fechaPrestamo,fechaLimite,estado) VALUES (?,?,?,?,?,'activo')",
    [id, usuarioId, libroId, fechaPrestamo, fechaLimite]
  );
  await db.run('UPDATE libros SET stock = stock - 1 WHERE id=?', [libroId]);

  return db.get('SELECT * FROM prestamos WHERE id=?', [id]);
};

const devolver = async (id) => {
  const p = await db.get('SELECT * FROM prestamos WHERE id=?', [id]);
  if (!p) { const err = new Error('Préstamo no encontrado'); err.status = 404; throw err; }
  if (p.estado === 'devuelto') { const err = new Error('Este préstamo ya fue devuelto'); err.status = 409; throw err; }

  const fechaDevolucion = new Date().toISOString();
  await db.run("UPDATE prestamos SET estado='devuelto', fechaDevolucion=? WHERE id=?", [fechaDevolucion, id]);
  await db.run('UPDATE libros SET stock = stock + 1 WHERE id=?', [p.libroId]);

  return db.get('SELECT * FROM prestamos WHERE id=?', [id]);
};

const getHistorialUsuario = async (usuarioId) => {
  const u = await db.get('SELECT id FROM usuarios WHERE id=?', [usuarioId]);
  if (!u) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
  return db.all('SELECT * FROM prestamos WHERE usuarioId=? ORDER BY fechaPrestamo DESC', [usuarioId]);
};

module.exports = { getAll, getById, create, devolver, getHistorialUsuario };
