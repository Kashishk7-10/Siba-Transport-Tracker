const mongoose = require('mongoose');
const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [
    {
      stopName: String,
      arrival: String,
      departure: String,
    },
  ],
});
module.exports = mongoose.model('Route', routeSchema);
