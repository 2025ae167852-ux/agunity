const farmsService = require('../services/farms.service');

async function listFarms(req, res, next) {
  try {
    const farms = await farmsService.listByUserId(req.user.id);
    res.json({ farms });
  } catch (error) {
    next(error);
  }
}

async function createFarm(req, res, next) {
  try {
    const farm = await farmsService.createForUser(req.user.id, req.body || {});
    res.status(201).json({ farm });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listFarms,
  createFarm,
};
