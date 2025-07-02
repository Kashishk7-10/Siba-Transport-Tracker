const Shift = require('../models/shiftModel');

// ✅ GET all shifts (already good)
exports.getAllShifts = async (req, res) => {
  try {
    const query = req.query.season ? { season: req.query.season } : {};
    const shifts = await Shift.find(query);
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ POST create new shift with Socket.IO event
exports.createShift = async (req, res) => {
  try {
    const newShift = new Shift(req.body);
    const savedShift = await newShift.save();

    // 🟢 Emit to all clients
    req.app.get('io').emit('newShift', savedShift);

    res.status(201).json(savedShift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
