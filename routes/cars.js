const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Car = require('../models/Car');

// Utils
const StorageEngine = require('../utils/StorageEngine');
const storageEngine = new StorageEngine('./public/uploads/cars', 10004508);

// @route   GET server/cars
// @desc    GET cars user
// @access  Private
router.get('/user', auth, async (req, res) => {
  // destructure
  const { id } = req.user;

  // search cars
  try {
    // find cars with matching user_id
    let cars = await Car.find({ user_id: id });

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
});

// @route POST server/cars
// @desc POST car
// @access Private
router.post(
  '/user',
  auth,
  storageEngine.upload.array('pictures', 4),
  [
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

    // resize images and remove ./public/ from path
    imagePath.forEach((element) => {
      try {
        storageEngine.imageHandler(element, 600, 400, 90);
        console.log(element + ' has been resized');
      } catch (error) {
        // delete image
        storageEngine.unlink(element);
        errors = {
          msg: 'Image upload failed. Please try again',
        };
      }
    });

    // destructure
    let {
      brand,
      model,
      year,
      kmDriven,
      fueltype,
      seats,
      color,
      pictures,
    } = req.body;

    // user id
    const user_id = req.user.id;

    // create label
    let label = `${brand} ${model}`;
    // remove brand from label if too long
    if (label.length > 15) {
      label = model;
    }

    // initial active status
    const active = false;

    // set imagePath to default image if empty
    if (imagePath.length === 0) {
      imagePath.push('public/default/cars/default-car.jpg');
    }

    // pictures = imagepath
    pictures = imagePath;

    try {
      // instantiate new Car
      const car = new Car({
        user_id,
        label,
        brand,
        model,
        year,
        kmDriven,
        fueltype,
        seats,
        color,
        pictures,
        active,
      });

      // save car
      await car.save();

      // response
      res.json({ msg: 'Your car has been saved successfully' });
    } catch (error) {
      // console error
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route DELETE server/car
// @desc DELETE car
// @access Private
router.delete('/delete', auth, async (req, res) => {
  // user id
  const user_id = req.user.id;

  // destructure
  const { id } = req.headers;

  try {
    // check if car exists
    let carExists = await Car.findById(id);

    // car doesn't exist
    if (!carExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "The car wasn't found" }] });
    }

    // user doesn't own car
    if (user_id !== carExists.user_id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Authorization denied' }] });
    }

    // car is active
    if (carExists.active === true) {
      return res.status(400).json({
        errors: [{ msg: "You can't delete a car that is active in rentals" }],
      });
    }

    // delete pictures
    if (carExists.pictures[0] !== 'public/default/cars/default-car.jpg') {
      carExists.pictures.forEach((element) => {
        storageEngine.unlink(element);
      });
    }

    // delete
    await Car.findByIdAndDelete({ _id: id });
    // response
    res.json({ msg: 'Your car has been deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
