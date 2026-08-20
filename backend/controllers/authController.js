const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// ================================
// REGISTER USER
// POST /api/auth/register
// ================================
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Return user with token
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// LOGIN USER
// POST /api/auth/login
// ================================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Return user with token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================================
// GET LOGGED IN USER
// GET /api/auth/me
// ================================
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getMe };