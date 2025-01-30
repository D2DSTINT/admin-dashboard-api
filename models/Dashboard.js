import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
    {
        totalBookings: {
            type: Number,
            required: true,
            default: 0,
        },
        pendingBookings: {
            type: Number,
            required: true,
            default: 0,
        },
        servicesOffered: {
            type: Number, // Tracks the number of services offered
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

export const Dashboard = mongoose.model("Dashboard", dashboardSchema);


