const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  rental_id: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('message', MessageSchema);
