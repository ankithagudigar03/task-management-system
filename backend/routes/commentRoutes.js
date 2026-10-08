const express = require("express");

const {
    getComments,
    createComment,
    deleteComment
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get comments for a task
router.get(
    "/task/:taskId",
    authMiddleware,
    getComments
);

// Add comment to a task
router.post(
    "/task/:taskId",
    authMiddleware,
    createComment
);

// Delete comment
router.delete(
    "/:id",
    authMiddleware,
    deleteComment
);

module.exports = router;