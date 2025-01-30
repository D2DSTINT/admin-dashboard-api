import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import corsOptions from "./middleware/cors.config.js";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests

// Use Booking routes
app.use("/api/bookings", cors(corsOptions), bookingRoutes);
// Use Service routes
app.use("/api/services", cors(corsOptions), serviceRoutes);

// Use Dashboard route
app.use("/api", cors(corsOptions), dashboardRoutes);

app.use((err, req, res, next) => {
    if (err.message.includes("CORS Error")) {
        return res.status(403).json({ success: false, message: err.message });
    }
    next(err); // Pass to default error handler if it's not a CORS error
});

app.get("/", (req, res) => {
    res.status(200).json("{status: 'Server is running'}");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
