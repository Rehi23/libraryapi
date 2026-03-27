const prestamosService = require('../services/prestamos.service');

const getAll = async (req, res, next) => {
  try {
    res.json(
      {
        success: true,
        data: await prestamosService.getAll(req.query.estado),
        message: 'Préstamos obtenidos correctamente'
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
        data: await prestamosService.getById(req.params.id),
        message: 'Préstamo encontrado'
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
const create = async (req, res, next) => {
  try {
    const {
      usuarioId,
      libroId,
      fechaLimite
    } = req.body;
    res.status(201).json(
      {
        success: true,
        data: await prestamosService.create(usuarioId, libroId, fechaLimite),
        message: 'Préstamo registrado correctamente'
      });
  } catch (err) {
    if (err.status) return res.status(err.status).json(
      {
        success: false,
        data: null,
        message: err.message
      });
    next(err);
  }
};
const devolver = async (req, res, next) => {
  try {
    res.json(
      {
        success: true,
        data: await prestamosService.devolver(req.params.id),
        message: 'Devolución registrada correctamente'
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
const getHistorialUsuario = async (req, res, next) => {
  try {
    res.json(
      {
        success: true,
        data: await prestamosService.getHistorialUsuario(req.params.id),
        message: 'Historial obtenido correctamente'
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

module.exports = { getAll, getById, create, devolver, getHistorialUsuario };
