const express = require('express');
const authRoutes = require('./auth.routes');
const farmsRoutes = require('./farms.routes');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/farms', requireAuth, farmsRoutes);

module.exports = router;
