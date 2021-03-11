const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middleware
const auth = require("../middleware/auth");
// Schema
const Rental = require("../models/Rental");
const Booking = require("../models/Booking");
const Message = require("../models/Message");

// @route POST server/bookings
// @desc GET bookings
// @access Private
router.get("/user", auth, async (req, res) => {
  // get user id
  const { id } = req.user;

  // search bookings
  try {
    // find cars with matching user_id
    let bookings = await Booking.find({ user_id: id });

    // no cars were found
    if (!bookings) {
      res.status(400).json({ errors: "No bookings found" });
    }
    let bookingsNew = [];

    for (let i = 0; i < bookings.length; i++) {
      const element = bookings[i];
      let rentalMatch = await Rental.findById(element.rental_id);
      bookingsNew.push(rentalMatch);
    }

    // bookings.forEach(element => {
    //   let rentalMatch = await Rental.findById(element.rental_id)
    //   bookingsNew.push(rentalMatch)
    // });

    // response
    res.json(bookingsNew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// @route POST server/bookings
// @desc POST bookings
// @access Private
router.post(
  "/user",
  auth,
  [
    check("checkIn", "Please enter a check in date").notEmpty(),
    check("checkOut", "Please enter a check out date").notEmpty(),
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
          errors: [{ msg: "The offer has already been booked" }],
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

      // create chatroom
      const content = `Hello, I've just booked your car from ${checkIn} till ${checkOut}. I'm looking forward to discussing all the nesseccary details with you. Best wishes`;
      message = new Message({
        rental_id,
        owner_id,
        user_id,
        content,
      });

      // set rental booked
      rentalExists.booked = true;
      // save updated car
      await rentalExists.save();

      // response
      res.json({ msg: "Your offer has been saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
