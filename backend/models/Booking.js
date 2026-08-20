const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    handymanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Handyman",
        required: true
    },
    category: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    problem: { type: String, required: true },
    status: {
        type: String,
        enum: ["in progress", "scheduled", "completed", "cancelled"],
        default: "scheduled"
    },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);