const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  season: { type: String, enum: ['regular', 'summer', 'exam'], required: true },
  shift: { type: String, enum: ['1st', '2nd', '3rd'], required: true },
  routeName: { type: String, required: true },
  pickTime: String,
  dropTime: String,
  assignedBus: String
});

module.exports = mongoose.model('Shift', shiftSchema);
