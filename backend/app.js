const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/handymen", require("./routes/handymanRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Base route
app.get("/", (req, res) => {
    res.send("LetFixIt API is running!");
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));