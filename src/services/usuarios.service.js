const db = require('../db/database');

const getAll = () => db.all('SELECT id,nombre,correo,telefono,activo,createdAt FROM usuarios WHERE activo=1');

const getById = async (id) => {
  const u = await db.get('SELECT id,nombre,correo,telefono,activo,createdAt FROM usuarios WHERE id=?', [id]);
  if (!u) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
  return u;
};

const update = async (id, datos) => {
  const u = await db.get('SELECT * FROM usuarios WHERE id=?', [id]);
  if (!u) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
  const nombre   = datos.nombre   ?? u.nombre;
  const telefono = datos.telefono ?? u.telefono;
  await db.run('UPDATE usuarios SET nombre=?, telefono=? WHERE id=?', [nombre, telefono, id]);
  return db.get('SELECT id,nombre,correo,telefono,activo,createdAt FROM usuarios WHERE id=?', [id]);
};

const remove = async (id) => {
  const u = await db.get('SELECT * FROM usuarios WHERE id=? AND activo=1', [id]);
  if (!u) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
  const activos = await db.all("SELECT id FROM prestamos WHERE usuarioId=? AND estado='activo'", [id]);
  if (activos.length > 0) {
    const err = new Error('No se puede eliminar: el usuario tiene préstamos activos'); err.status = 409; throw err;
  }
  await db.run('UPDATE usuarios SET activo=0 WHERE id=?', [id]);
};

module.exports = { getAll, getById, update, remove };
