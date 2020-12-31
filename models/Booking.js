const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  rental_id: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('booking', BookingSchema);
