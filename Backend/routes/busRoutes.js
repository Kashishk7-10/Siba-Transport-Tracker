const express = require('express');
const router = express.Router();
const { getAllBuses, createBus } = require('../controllers/busController');

router.get('/', getAllBuses);
router.post('/', createBus);

module.exports = router;