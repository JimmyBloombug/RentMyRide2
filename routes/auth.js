const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET server/auth
// @desc    GET logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST server/auth
// @desc    Auth user && get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    // validate formData
    const errors = validationResult(req);

    // validation failed
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure
    const { email, password } = req.body;

    // try login
    try {
      // find user
      let user = await User.findOne({ email });

      // user not found return error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email doesn't exist" }] });
      }

      // match password
      const isMatch = await bcrypt.compare(password, user.password);

      // wrong password
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'You entered an invalid password' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // sign and return token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
    }
  }
);

module.exports = router;
