const express = require("express");
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    getHandymanBookings
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// User routes
router.post("/", protect, createBooking);
router.get("/", protect, getUserBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id", protect, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

// Handyman routes
router.get("/handyman/mybookings", protect, getHandymanBookings);

module.exports = router;