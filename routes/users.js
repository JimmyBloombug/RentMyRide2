const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Router
const router = express.Router();

// Config
const config = require('config');

// Userschema
const User = require('../models/User');
const e = require('express');

// Password Regex
const pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

// @route GET server/users
// @desc Get registered users
// @access Public
router.get('/', async (req, res) => {
  const { username, email } = req.headers;

  try {
    // search db
    const emailRes = await User.findOne({ email });
    const userRes = await User.findOne({ username });

    // if User exists
    if (emailRes && userRes) {
      return res.status(400).json({
        takenName: 'Username is taken',
        takenEmail: 'Email already exists',
      });
    } else if (userRes) {
      return res
        .status(400)
        .json({ takenName: 'Username is taken', takenEmail: '' });
    } else if (emailRes) {
      return res
        .status(400)
        .json({ takenEmail: 'Email already exists', takenName: '' });
    }

    return res.json({ msg: 'No such user' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route POST server/users
// @desc Register usern
// @access Public
router.post(
  '/',
  [
    check('username', 'Please enter username').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'examplePassword#123').matches(pwReg),
    check('firstName', 'Please enter First Name').not().isEmpty(),
    check('lastName', 'Please enter Last Name').not().isEmpty(),
    check('country', 'Please enter a country').exists({ checkNull: true }),
    check('number', 'Please enter a valid number').isNumeric(),
    check('street', 'Please enter Street Name').not().isEmpty(),
    check('zip', 'Please enter Zip Code').not().isEmpty(),
    check('city', 'Please enter City').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // return validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      country,
      number,
      street,
      zip,
      city,
    } = req.body;

    // return res.status(400).json({ country });

    try {
      // search db
      let emailRes = await User.findOne({ email });
      let userRes = await User.findOne({ username });

      // user already exists message
      if (emailRes || userRes) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // create user
      user = new User({
        username,
        email,
        password,
        firstName,
        lastName,
        country,
        number,
        street,
        zip,
        city,
      });

      // gen salt
      const salt = await bcrypt.genSalt(10);

      // gen user password
      user.password = await bcrypt.hash(password, salt);

      // save user
      await user.save();

      // web token payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // sign json web token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// export
module.exports = router;
