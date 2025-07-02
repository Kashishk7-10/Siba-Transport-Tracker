const express = require('express');
const router = express.Router();
const { registerAdmin, login } = require('../controllers/authController');

// Register route
router.post('/register', registerAdmin);

// Login route
router.post('/login', login);

// Optional route for development only
const User = require('../models/userModel');
router.get('/all-admins', async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
