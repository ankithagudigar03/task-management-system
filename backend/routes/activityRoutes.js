
const express = require("express");
const router = express.Router();

const {
    getActivities,
    deleteActivity
} = require("../controllers/activityController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getActivities);

// Delete one activity record
router.delete("/:id", protect, deleteActivity);

module.exports = router;
