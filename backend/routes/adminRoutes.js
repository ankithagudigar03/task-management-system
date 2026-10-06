const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getAdminStats } = require("../controllers/adminController");


router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    getAdminStats
);

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.json({
            message: "Welcome Admin!",
            userId: req.user.userId,
            role: req.user.role
        });
    }
);

module.exports = router;