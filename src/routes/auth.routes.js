const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const { register, login } = require('../controllers/auth.controller');

router.post('/register', [
  body('nombre').notEmpty().withMessage("El campo 'nombre' es obligatorio"),
  body('correo').isEmail().withMessage('El correo no tiene un formato válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validate
], register);

router.post('/login', [
  body('correo').isEmail().withMessage('El correo no tiene un formato válido'),
  body('password').notEmpty().withMessage("El campo 'password' es obligatorio"),
  validate
], login);

module.exports = router;
