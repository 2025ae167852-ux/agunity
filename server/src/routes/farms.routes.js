const express = require('express');
const farmsController = require('../controllers/farms.controller');

const router = express.Router();

router.get('/', farmsController.listFarms);
router.post('/', farmsController.createFarm);

module.exports = router;
