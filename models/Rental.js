const mongoose = require('mongoose');

const RentalSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  car: {
    type: Object,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  billing: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('rental', RentalSchema);
