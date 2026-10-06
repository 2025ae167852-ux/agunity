const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body || {});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body || {});
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({
    user: authService.sanitizeUser(req.user),
  });
}

module.exports = {
  register,
  login,
  me,
};
