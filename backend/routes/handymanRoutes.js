const express = require("express");
const router = express.Router();
const {
    registerHandyman,
    loginHandyman,
    getAllHandymen,
    getHandymanById,
    updateHandyman,
    deleteHandyman
} = require("../controllers/handymanController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerHandyman);
router.post("/login", loginHandyman);
router.get("/", getAllHandymen);
router.get("/:id", getHandymanById);
router.put("/:id", protect, updateHandyman);
router.delete("/:id", protect, deleteHandyman);

module.exports = router;