const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Handyman = require("../models/Handyman");

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check role and find in correct collection
        if (decoded.role === "handyman") {
            req.user = await Handyman.findById(decoded.id).select("-password");
        } else {
            req.user = await User.findById(decoded.id).select("-password");
        }

        next();

    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

// In bookingController.js — update getHandymanBookings
const getHandymanBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ handymanId: req.user.id })
            .populate("userId", "username email") // 👈 populate user details
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { protect };