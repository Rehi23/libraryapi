const librosService = require('../services/libros.service');

const getAll = async (req, res, next) => {
  try {
    res.json(
      {
        success: true,
        data: await librosService.getAll(),
        message: 'Libros obtenidos correctamente'
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
        data: await librosService.getById(req.params.id),
        message: 'Libro encontrado'
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
    res.status(201).json(
      {
        success: true,
        data: await librosService.create(req.body),
        message: 'Libro creado correctamente'
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
        data: await librosService.update(req.params.id, req.body),
        message: 'Libro actualizado correctamente'
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
    await librosService.remove(req.params.id);
    res.json(
      {
        success: true,
        data: null,
        message: 'Libro eliminado correctamente'
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

module.exports = { getAll, getById, create, update, remove };
