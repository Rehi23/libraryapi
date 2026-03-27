const router = require('express').Router();
const { body } = require('express-validator');
const validate  = require('../middlewares/validate.middleware');
const auth      = require('../middlewares/auth.middleware');
const ctrl      = require('../controllers/usuarios.controller');
const prestamosCtrl = require('../controllers/prestamos.controller');

router.get('/',                     ctrl.getAll);
router.get('/:id',                  ctrl.getById);
router.get('/:id/prestamos',        prestamosCtrl.getHistorialUsuario);

router.patch('/:id', [
  body('nombre').optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body('telefono').optional().isMobilePhone().withMessage('Teléfono inválido'),
  validate
], ctrl.update);

router.delete('/:id', ctrl.remove);

module.exports = router;
