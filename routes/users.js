const express = require('express');

// Router
const router = express.Router();

// Userschema
const User = require('../models/User');

// @route GET server/users
// @desc Get registered users
// @access Public

router.get('/', async (req, res) => {
  const { username, email } = req.query;

  try {
    // search db
    const emailRes = await User.findOne({ email });
    const userRes = await User.findOne({ username });

    // set message
    if (emailRes && userRes) {
      res.json({ email: true, user: true });
    } else if (userRes) {
      res.json({ user: true });
    } else if (emailRes) {
      res.json({ email: true });
    } else {
      res.json({ msg: 'Not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// export
module.exports = router;
