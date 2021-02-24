const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Car = require('../models/Car');
const Rental = require('../models/Rental');
// Utils
const Query = require('../utils/Query');

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
        let rentals = await Rental.find({
          booked: { $ne: true },
        })
          .sort({ _id: -1 })
          .limit(limit);
        res.json(rentals);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
      }
      break;
    case 'single':
      try {
        // find by id
        let rental = await Rental.findById(req.headers.id);
        res.json(rental);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
      }
      break;
    case 'user':
      try {
        // find by user id
        let rentals = await Rental.find({ user_id: req.headers.id });
        res.json(rentals);
      } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
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
        res.status(500).json({ errors: 'Internal Server Error' });
      }
      break;
  }
});

// @route   GET server/rentals
// @desc    GET rentals user
// @access  Public
router.get(
  '/search',
  [
    check('car').isString(),
    check('location').isString(),
    check('kmdriven').isString(),
    check('fueltype').isString(),
    check('seats').isString(),
    check('color').isString(),
  ],
  async (req, res) => {
    try {
      // destructure
      let { car, location, kmdriven, fueltype, seats, color } = req.headers;

      // define query
      Query.defineQuery({
        booked: { $ne: true },
        'car.label': { $regex: car, $options: 'i' },
        'location.region': { $regex: location, $options: 'i' },
        'car.kmDriven': { $regex: kmdriven },
        'car.fueltype': { $regex: fueltype },
        'car.seats': { $regex: seats },
        'car.color': { $regex: color },
      });

      // if kmdriven is +200k remove replace regex with eq
      if (kmdriven === '+200.000 km') {
        Query.changeQuery({
          'car.kmDriven': { $eq: kmdriven },
        });
      }
      // get matching rentals
      let rentals = await Rental.find(Query.query);

      // console.log(req.headers);
      // console.log('==================');
      // response
      res.json(rentals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Internal Server Error' });
    }
  }
);

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
    // // initial booking status
    // const booked = false;

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
      });

      // save rental offer
      await rental.save();

      // response
      res.json({ msg: 'Your offer has been saved successfully' });
    } catch (error) {
      // console error
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route DELETE server/rental
// @desc DELETE rental
// @access Private
router.delete('/delete', auth, async (req, res) => {
  // user id
  const user_id = req.user.id;

  // destructure
  const { id } = req.headers;

  try {
    // check if rental offer exists
    let rentalExists = await Rental.findById(id);

    // rental offer doesn't exist
    if (!rentalExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "The rental offer wasn't found" }] });
    }

    // find car
    let carExists = await Car.findById(rentalExists.car._id);

    // user doesn't own rental offer
    if (user_id !== rentalExists.user_id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Authorization denied' }] });
    }

    // rental offer is booked
    if (rentalExists.booked === true) {
      return res.status(400).json({
        errors: [{ msg: "You can't delete an offer when it's booked" }],
      });
    }

    // update car
    carExists.active = false;
    // save car
    await carExists.save();

    // delete
    await Rental.findByIdAndDelete({ _id: id });
    // response
    res.json({ msg: 'Your offer has been deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
