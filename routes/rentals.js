const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Car = require('../models/Car');
const Rental = require('../models/Rental');

// @route   GET server/rentals
// @desc    GET rentals
// @access  Public
router.get(
  '/',
  auth,
  [check('user_id', 'No user id found').isString().notEmpty()],
  async (req, res) => {
    // validate formData
    const errors = validationResult(req);

    // validation failed
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure
    const { user_id } = req.headers;

    // search cars
    try {
      // find cars with matching user_id
      let rental = await Rental.find({ user_id });

      // no cars were found
      if (!rental) {
        res.status(400).json({ errors: 'No rental offers found' });
      }

      // response
      res.json(rental);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Internal Server Error' });
    }
  }
);

// @route POST server/rentals
// @desc POST rentals
// @access Private
router.post(
  '/',
  auth,
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
    // initial booking status
    const booked = false;

    try {
      // // check if car exists
      let carExists = await Car.findById(car._id);

      // error if car doesn't exist
      if (!carExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Your car wasn't found" }] });
      }

      // error if car is already active in other offer
      if (carExists.active === true) {
        return res.status(400).json({
          errors: [{ msg: 'The car is already active in another offer' }],
        });
      }

      // set car is active
      carExists.active = true;
      // save updated car
      await carExists.save();

      // create rental offer
      rental = new Rental({
        user_id,
        car,
        price,
        billing,
        location,
        booked,
      });

      // sace rental offer
      await rental.save();

      // response
      res.json({ msg: 'Your offer has been saved successfully', errors });
    } catch (error) {
      // console error
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
