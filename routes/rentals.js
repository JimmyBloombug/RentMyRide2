const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Rental = require('../models/Rental');

// @route   GET server/rentals
// @desc    GET rentals
// @access  Public

// @route POST server/rentals
// @desc POST rentals
// @access Private
router.post(
  '/',
  [
    check('user_id', 'No user id found').isString().notEmpty(),
    check('car', 'Please choose a car').exists({ checkNull: true }),
    check('price', 'Please choose a price').isNumeric().notEmpty(),
    check('billing', 'Please choose a billing type').isString().notEmpty(),
    check('location', 'Where is your car located?').exists({ checkNull: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // return validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure
    const { user_id, car, price, billing, location } = req.body;

    try {
    } catch (error) {}
  }
);
