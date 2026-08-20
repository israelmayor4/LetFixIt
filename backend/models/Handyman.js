const mongoose = require("mongoose");

const handymanSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jobTitle: { type: String, required: true },
    avatar: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    rate: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    services: { type: [String], default: [] },
    status: { type: String, default: "Available" },
    trending: { type: Boolean, default: false },
    experienced: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Handyman", handymanSchema);