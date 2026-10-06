const { verifyToken, findUserById } = require('../services/auth.service');
const { AppError } = require('../utils/errors');

async function requireAuth(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      throw new AppError(401, 'Authentication token missing');
    }

    const decoded = verifyToken(token);
    const user = await findUserById(decoded.sub);

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  requireAuth,
};
