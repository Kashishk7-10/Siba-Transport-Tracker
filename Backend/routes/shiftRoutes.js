const express = require('express');
const router = express.Router();

const { getAllShifts, createShift } = require('../controllers/shiftcontroller');

router.get('/', getAllShifts);
router.post('/', createShift);

module.exports = router;
