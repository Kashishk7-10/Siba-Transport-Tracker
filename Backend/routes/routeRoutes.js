const express = require('express');
const router = express.Router();
const { getAllRoutes, createRoute } = require('../controllers/routeController');

// ✅ FIX: Ensure these match the controller names exactly
router.get('/', getAllRoutes);
router.post('/', createRoute);

module.exports = router;
