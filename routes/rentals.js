const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const User = require('../models/User');
const Car = require('../models/Car');
const Rental = require('../models/Rental');

// @route   GET server/rentals
// @desc    GET rentals
// @access  Public
router.get('/public', async (req, res) => {
  switch (req.headers.type) {
    case 'recent':
      try {
        // limit
        let { limit } = req.headers;
        limit = parseInt(limit);

        // get newest rental offers
        let rentals = await Rental.find().sort({ _id: -1 }).limit(limit);
        res.json(rentals);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internatl Server Error' });
      }
      break;
    case 'single':
      try {
        // find by id
        let rental = await Rental.findById(req.headers.id);
        res.json(rental);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internatl Server Error' });
      }
      break;
    case 'user':
      try {
        // find by user id
        let rentals = await Rental.find({ user_id: req.headers.id });
        res.json(rentals);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internatl Server Error' });
      }
      break;
    case 'all':
      try {
        // get all rentals
        let rentals = await Rental.find();
        // response
        res.json(rentals);
      } catch (error) {
        // error
        console.error(error);
        // response
        res.status(500).json({ errors: 'Internatl Server Error' });
      }
  }
});

// @route   GET server/rentals
// @desc    GET rentals user
// @access  Private
router.get('/user', auth, async (req, res) => {
  // validate formData
  const errors = validationResult(req);

  // validation failed
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // get user id
  const { id } = req.user;

  // search cars
  try {
    // find cars with matching user_id
    let rental = await Rental.find({ user_id: id });

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
});

// @route POST server/rentals
// @desc POST rentals
// @access Private
router.post(
  '/user',
  auth,
  [
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
    const { car, price, billing, location } = req.body;
    // get user id
    const user_id = req.user.id;
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

      let userExists = await User.findById(user_id);

      // error if user doesn't exist
      if (!userExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "The user wasn't found" }] });
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
