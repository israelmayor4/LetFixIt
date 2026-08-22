const Handyman = require("../models/Handyman");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// ================================
// REGISTER HANDYMAN
// POST /api/handymen/register
// ================================
const registerHandyman = async (req, res) => {
    try {
        const { username, email, password, jobTitle, location, phone, rate, bio, services } = req.body;

        if (!username || !email || !password || !jobTitle) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const handymanExists = await Handyman.findOne({ email });
        if (handymanExists) {
            return res.status(400).json({ message: "Handyman already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const handyman = await Handyman.create({
            username,
            email,
            password: hashedPassword,
            jobTitle,
            location,
            phone,
            rate,
            bio,
            services
        });

        res.status(201).json({
            _id: handyman._id,
            username: handyman.username,
            email: handyman.email,
            jobTitle: handyman.jobTitle,
            role: "handyman",
            token: generateToken(handyman._id, "handyman")
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// LOGIN HANDYMAN
// POST /api/handymen/login
// ================================
const loginHandyman = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const handyman = await Handyman.findOne({ email });
        if (!handyman) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, handyman.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({
            _id: handyman._id,
            username: handyman.username,
            email: handyman.email,
            jobTitle: handyman.jobTitle,
            role: "handyman",
            token: generateToken(handyman._id, "handyman")
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// GET ALL HANDYMEN
// GET /api/handymen
// ================================
const getAllHandymen = async (req, res) => {
    try {
        const handymen = await Handyman.find().select("-password");
        res.json(handymen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// GET SINGLE HANDYMAN
// GET /api/handymen/:id
// ================================
const getHandymanById = async (req, res) => {
    try {
        const handyman = await Handyman.findById(req.params.id).select("-password");

        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }

        res.json(handyman);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// UPDATE HANDYMAN PROFILE
// PUT /api/handymen/:id
// ================================
const updateHandyman = async (req, res) => {
    try {
        const handyman = await Handyman.findById(req.params.id);

        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }

        // Make sure handyman can only update their own profile
        if (handyman._id.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedHandyman = await Handyman.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        res.json(updatedHandyman);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// DELETE HANDYMAN
// DELETE /api/handymen/:id
// ================================
const deleteHandyman = async (req, res) => {
    try {
        const handyman = await Handyman.findById(req.params.id);

        if (!handyman) {
            return res.status(404).json({ message: "Handyman not found" });
        }

        await handyman.deleteOne();
        res.json({ message: "Handyman deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerHandyman,
    loginHandyman,
    getAllHandymen,
    getHandymanById,
    updateHandyman,
    deleteHandyman
};