const usuariosService = require('../services/usuarios.service');

const getAll = async (req, res, next) => {
  try {
    res.json(
      {
        success: true, data: await usuariosService.getAll(),
        message: 'Usuarios obtenidos correctamente'
      });
  }
  catch (err) {
    next(err);
  }
};
const getById = async (req, res, next) => {
  try {
    res.json(
      {
        success: true,
        data: await usuariosService.getById(req.params.id),
        message: 'Usuario encontrado'
      });
  }
  catch (err) {
    if (err.status) return res.status(err.status).json(
      {
        success: false,
        data: null,
        message: err.message
      });
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    res.json(
      {
        success: true,
        data: await usuariosService.update(req.params.id, req.body),
        message: 'Usuario actualizado correctamente'
      });
  }
  catch (err) {
    if (err.status) return res.status(err.status).json(
      {
        success: false,
        data: null,
        message: err.message
      });
    next(err);
  }
};
const remove = async (req, res, next) => {
  try {
    await usuariosService.remove(req.params.id);
    res.json(
      {
        success: true,
        data: null,
        message: 'Usuario dado de baja correctamente'
      });
  }
  catch (err) {
    if (err.status) return res.status(err.status).json(
      {
        success: false,
        data: null,
        message: err.message
      });
    next(err);
  }
};

module.exports = { getAll, getById, update, remove };
