const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Car = require('../models/Car');

// Utils
const StorageEngine = require('../utils/StorageEngine');
const storageEngine = new StorageEngine('./public/uploads/cars', 5004508);

// @route   GET server/cars
// @desc    GET cars
// @access  Private
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
      let cars = await Car.find({ user_id });

      // no cars were found
      if (!cars) {
        res.status(400).json({ errors: 'No cars found' });
      }

      // response
      res.json(cars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Internal Server Error' });
    }
  }
);

// @route POST server/cars
// @desc POST car
// @access Private
router.post(
  '/',
  auth,
  storageEngine.upload.array('pictures', 4),
  [
    check('user_id', 'No user id found').isString().notEmpty(),
    check('brand', 'Please enter car brand').isString().notEmpty(),
    check('model', 'Please enter car model').isString().notEmpty(),
    check('year', 'Please enter manufacturing year').isString().notEmpty(),
    check('kmDriven', 'Please enter kilometres driven').isString().notEmpty(),
    check('fueltype', 'Please enter a fueltype').isString().notEmpty(),
    check('seats', 'Please enter number of car seats').isString().notEmpty(),
    check('color', 'Please enter car color').isString().notEmpty(),
  ],
  async (req, res) => {
    // validate formData
    const errors = validationResult(req);

    // image
    let imagePath = [];

    req.files.forEach((element) => {
      imagePath.push(element.path);
    });

    // validation failed
    if (!errors.isEmpty()) {
      // delete image
      if (imagePath.length > 0) {
        imagePath.forEach((element) => {
          storageEngine.unlink(element);
        });
      }

      // respond errors
      return res
        .status(400)
        .json({ msg: 'An error occurred', errors: errors.array() });
    }

    let newImagePath = [];

    // resize images and remove ./public/ from path
    imagePath.forEach((element) => {
      if (storageEngine.imageHandler(element, 600, 400, 90)) {
        console.log(element + ' has been resized');
      } else {
        console.error(element + ' resize error');
        // delet image
        storageEngine.unlink(element);
        errors = {
          msg: 'Image upload failed. Please try again',
        };
      }

      newImagePath.push(element.substring(7));
    });

    // destructure
    let {
      user_id,
      brand,
      model,
      year,
      kmDriven,
      fueltype,
      seats,
      color,
      pictures,
    } = req.body;

    pictures = newImagePath;

    try {
      // instantiate new Car
      const car = new Car({
        user_id,
        brand,
        model,
        year,
        kmDriven,
        fueltype,
        seats,
        color,
        pictures,
      });

      // save car
      await car.save();

      // response
      res.json({ msg: 'Your car has been saved successfully', errors });
    } catch (error) {
      // console error
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
