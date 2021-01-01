const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Middleware
const auth = require('../middleware/auth');
// Schema
const Rental = require('../models/Rental');
const Booking = require('../models/Booking');

// @route POST server/bookings
// @desc POST rentals
// @access Private
router.post(
  '/user',
  auth,
  [
    check('checkIn', 'Please enter a check in date').notEmpty(),
    check('checkOut', 'Please enter a check out date').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // destructure
    let { rental_id, checkIn, checkOut } = req.body;

    // return validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // get user id
    const user_id = req.user.id;

    try {
      // // check if rental exists
      let rentalExists = await Rental.findById(rental_id);

      // error if rental doesn't exist
      if (!rentalExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "The rental offer wasn't found" }] });
      }

      // error if rental is already booked
      if (rentalExists.booked === true) {
        return res.status(400).json({
          errors: [{ msg: 'The offer has already been booked' }],
        });
      }

      // get rental owner
      const owner_id = rentalExists.user_id;

      // error if user tries to book his own offer
      if (user_id === owner_id) {
        return res
          .status(400)
          .json({ errors: [{ msg: "You can't book your own offer" }] });
      }

      // create booking
      booking = new Booking({
        user_id,
        owner_id,
        rental_id,
        checkIn,
        checkOut,
      });

      // save booking
      await booking.save();

      // set rental booked
      rentalExists.booked = true;
      // save updated car
      await rentalExists.save();

      // response
      res.json({ msg: 'Your offer has been saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
