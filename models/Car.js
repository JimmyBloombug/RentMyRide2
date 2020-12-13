const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  kmDriven: {
    type: String,
    required: true,
  },
  fueltype: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  pictures: {
    type: Array,
  },
  active: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('car', CarSchema);
