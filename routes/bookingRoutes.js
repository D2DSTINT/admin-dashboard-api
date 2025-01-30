import { Router } from "express";
import {
    acceptBooking,
    rejectBooking,
    getAllBookings,
} from "../controllers/bookingController.js";
const router = Router();

// PUT route to accept a booking
router.put("/:id/accept", acceptBooking);

// PUT route to reject a booking
router.put("/:id/reject", rejectBooking);

// GET Route to fetch all bookings
router.get("/", getAllBookings);

export default router;
