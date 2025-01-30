const express = require("express");
const {
    acceptBooking,
    rejectBooking,
    getAllBookings,
} = require("../controllers/bookingController");
const router = express.Router();

// PUT route to accept a booking
router.put("/:id/accept", acceptBooking);

// PUT route to reject a booking
router.put("/:id/reject", rejectBooking);

// GET Route to fetch all bookings
router.get("/", getAllBookings);

module.exports = router;
