const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { nombre, correo, password } = req.body;
    const data = await authService.register(nombre, correo, password);
    res.status(201).json({ success: true, data, message: 'Usuario registrado correctamente' });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ success: false, data: null, message: err.message });
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const data = await authService.login(correo, password);
    res.json({ success: true, data, message: 'Login exitoso' });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ success: false, data: null, message: err.message });
    next(err);
  }
};

module.exports = { register, login };
