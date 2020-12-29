const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Booking = require('../models/Booking');

// @route POST server/bookings
// @desc POST rentals
// @access Private
router.post(
  '/user',
  auth,
  [
    check('checkIn', 'Please enter a check in date').isDate(),
    check('checkOut', 'Please enter a check out date').isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // return validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
