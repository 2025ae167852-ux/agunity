const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');
const env = require('../config/env');
const { AppError } = require('../utils/errors');

const users = [];

const sanitizeUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

const findUserByEmail = async (email) => {
  const normalized = String(email || '').trim().toLowerCase();
  return users.find((user) => user.email.toLowerCase() === normalized) || null;
};

const findUserById = async (id) => users.find((user) => user.id === id) || null;

const signToken = (user) => jwt.sign(
  { sub: user.id, email: user.email, role: user.role },
  env.jwtSecret,
  { expiresIn: env.jwtExpiresIn }
);

const register = async ({ fullName, email, password, role = 'farmer' }) => {
  if (!fullName || !email || !password) {
    throw new AppError(400, 'fullName, email, and password are required');
  }

  const normalizedEmail = String(email).trim();
  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    throw new AppError(409, 'A user with that email already exists');
  }

  if (String(password).length < 8) {
    throw new AppError(400, 'Password must be at least 8 characters long');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: randomUUID(),
    fullName: String(fullName).trim(),
    email: normalizedEmail,
    passwordHash,
    role: String(role || 'farmer').trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);

  return {
    token: signToken(user),
    user: sanitizeUser(user),
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError(400, 'email and password are required');
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  return {
    token: signToken(user),
    user: sanitizeUser(user),
  };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    throw new AppError(401, 'Invalid or expired token');
  }
};

module.exports = {
  register,
  login,
  findUserById,
  findUserByEmail,
  verifyToken,
  sanitizeUser,
};
