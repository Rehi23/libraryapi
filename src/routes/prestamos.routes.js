const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const auth     = require('../middlewares/auth.middleware');
const ctrl     = require('../controllers/prestamos.controller');

router.get('/',              ctrl.getAll);
router.get('/:id',           ctrl.getById);

router.post('/', [
  body('usuarioId').notEmpty().withMessage("El campo 'usuarioId' es obligatorio"),
  body('libroId').notEmpty().withMessage("El campo 'libroId' es obligatorio"),
  body('fechaLimite').isISO8601().withMessage('fechaLimite debe ser una fecha válida en formato ISO 8601'),
  validate
], ctrl.create);

router.patch('/:id/devolver', ctrl.devolver);

module.exports = router;
