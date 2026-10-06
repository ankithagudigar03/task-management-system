const express = require("express");

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
    getTaskAnalytics
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Get only logged-in user's tasks
router.get("/", authMiddleware, getTasks);

router.get("/stats", authMiddleware, getTaskStats);

router.get("/analytics", authMiddleware, getTaskAnalytics);

// Get one task
router.get("/:id", authMiddleware, getTaskById);

// Create task
router.post("/", authMiddleware, createTask);

// Update task
router.put("/:id", authMiddleware, updateTask);

// Delete task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;