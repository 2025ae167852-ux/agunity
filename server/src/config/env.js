require('dotenv').config();

const port = Number(process.env.PORT || process.env.SERVER_PORT || 4000);
const host = process.env.SERVER_HOST || '0.0.0.0';

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  host,
  port,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/agunity',
  databaseSsl: String(process.env.DATABASE_SSL || 'false').toLowerCase() === 'true',
  frontendAppUrl: process.env.FRONTEND_APP_URL?.trim() || null,
  publicApiBaseUrl: process.env.PUBLIC_API_BASE_URL || `http://${host}:${port}`,
};
