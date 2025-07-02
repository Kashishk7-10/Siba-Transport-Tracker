const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  label: { type: String, required: true },
  status: { type: String, default: 'On Route' },
  currentLocation: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Bus', busSchema);
