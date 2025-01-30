const Booking = require("../models/Booking"); // Assuming the Booking model is correctly set up
const Dashboard = require("../models/Dashboard");

// fetch all Bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Accept a booking
const acceptBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({ id });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({
                message: "Booking status cannot be changed once updated",
            });
        }

        booking.status = "Accepted";
        await booking.save();

        // Update Dashboard: Decrease pendingBookings
        await Dashboard.findOneAndUpdate(
            { pendingBookings: { $gt: 0 } }, // Ensure pendingBookings is not negative
            { $inc: { pendingBookings: -1 } },
            { new: true }
        );
        res.status(200).json({
            message: "Booking accepted successfully",
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Reject a booking
const rejectBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOne({ id });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({
                message: "Booking status cannot be changed once updated",
            });
        }

        booking.status = "Rejected";
        await booking.save();

        // Update Dashboard: Decrease pendingBookings
        await Dashboard.findOneAndUpdate(
            { pendingBookings: { $gt: 0 } }, // Ensure pendingBookings is not negative
            { $inc: { pendingBookings: -1 } },
            { new: true }
        );

        res.status(200).json({
            message: "Booking rejected successfully",
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    acceptBooking,
    rejectBooking,
    getAllBookings,
};
