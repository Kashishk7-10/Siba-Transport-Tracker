const Route = require('../models/routeModel');
const Shift = require('../models/shiftModel');

// ✅ FIX: fetch routes by season
exports.getAllRoutes = async (req, res) => {
  try {
    const { season } = req.query;

    if (!season) {
      return res.status(400).json({ message: 'Season is required' });
    }

    const shifts = await Shift.find({ season });
    const routeNames = shifts.map((shift) => shift.routeName);
    const routes = await Route.find({ name: { $in: routeNames } });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();

    // ✅ Emit to all connected clients via Socket.IO
    req.app.get('io').emit('newRoute', newRoute);

    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

