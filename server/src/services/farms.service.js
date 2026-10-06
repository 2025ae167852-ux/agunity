const { randomUUID } = require('node:crypto');
const { AppError } = require('../utils/errors');

const farms = [];

const listByUserId = async (userId) => farms
  .filter((farm) => farm.userId === userId)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const createForUser = async (userId, payload = {}) => {
  const name = String(payload.name || '').trim();
  const location = String(payload.location || '').trim();

  if (!name || !location) {
    throw new AppError(400, 'name and location are required');
  }

  const farm = {
    id: randomUUID(),
    userId,
    name,
    location,
    country: payload.country || null,
    county: payload.county || null,
    acreageHectares: Number(payload.acreageHectares || 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  farms.push(farm);
  return farm;
};

module.exports = {
  listByUserId,
  createForUser,
};
