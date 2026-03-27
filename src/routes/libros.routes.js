const router = require('express').Router();
const { body } = require('express-validator');
const validate  = require('../middlewares/validate.middleware');
const auth      = require('../middlewares/auth.middleware');
const ctrl      = require('../controllers/libros.controller');

router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getById);

router.post('/', [
  body('titulo').notEmpty().withMessage("El campo 'titulo' es obligatorio"),
  body('autor').notEmpty().withMessage("El campo 'autor' es obligatorio"),
  body('isbn').notEmpty().withMessage("El campo 'isbn' es obligatorio"),
  body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero >= 0'),
  validate
], ctrl.create);

router.patch('/:id', [
  body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero >= 0'),
  validate
], ctrl.update);

router.delete('/:id', ctrl.remove);

module.exports = router;
