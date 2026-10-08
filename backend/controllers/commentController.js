const Comment = require("../models/Comment");
const Task = require("../models/Task");

// =========================
// GET COMMENTS FOR A TASK
// =========================

const getComments = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const comments = await Comment.find({
            task: req.params.taskId
        })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// =========================
// CREATE COMMENT
// =========================

const createComment = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.taskId,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        const comment = await Comment.create({
            task: task._id,
            user: req.user.userId,
            text: text.trim()
        });

        const populatedComment = await comment.populate(
            "user",
            "name email"
        );

        res.status(201).json(populatedComment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// =========================
// DELETE COMMENT
// =========================

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getComments,
    createComment,
    deleteComment
};