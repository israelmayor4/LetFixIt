const Booking = require("../models/Booking");
const Handyman = require("../models/Handyman");

// ================================
// CREATE BOOKING
// POST /api/bookings
// ================================
const createBooking = async (req, res) => {
    try {
        const { handymanId, category, service, date, time, address, problem } = req.body;

        if (!handymanId || !category || !service || !date || !time || !address || !problem) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // Check handyman exists
        const handyman = await Handyman.findById(handymanId);
        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            handymanId,
            category,
            service,
            date,
            time,
            address,
            problem
        });

        res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// GET ALL BOOKINGS FOR A USER
// GET /api/bookings
// ================================
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate("handymanId", "username jobTitle avatar rating totalJobs phone")
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
// ================================
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("handymanId", "username jobTitle avatar rating totalJobs phone");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Make sure booking belongs to the logged in user
        if (booking.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        res.json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// UPDATE BOOKING STATUS
// PUT /api/bookings/:id
// ================================
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Make sure booking belongs to the logged in user
        if (booking.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        ).populate("handymanId", "username jobTitle avatar rating totalJobs phone");

        res.json(updatedBooking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// DELETE BOOKING
// DELETE /api/bookings/:id
// ================================
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await booking.deleteOne();
        res.json({ message: "Booking deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// GET ALL BOOKINGS FOR A HANDYMAN
// GET /api/bookings/handyman
// ================================
const getHandymanBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ handymanId: req.user.id })
            .populate("userId", "username email")
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    getHandymanBookings
};