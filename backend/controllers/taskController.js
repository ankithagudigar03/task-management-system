const mongoose = require("mongoose");
const Task = require("../models/Task");

// Get all tasks - only logged-in user's tasks
// Get tasks - only logged-in user's tasks + pagination
const getTasks = async (req, res) => {
    try {
        const {
            search,
            status,
            priority,
            assignedTo,
            dueDate,
            page = 1,
            limit = 12
        } = req.query;

        const currentPage = Math.max(Number(page), 1);
        const tasksPerPage = Math.max(Number(limit), 1);

        const skip = (currentPage - 1) * tasksPerPage;

        // Only get tasks belonging to logged-in user
        let filter = {
            user: req.user.userId
        };

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (assignedTo) {
            filter.assignedTo = assignedTo;
        }

        if (dueDate) {
            filter.dueDate = dueDate;
        }

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(tasksPerPage);

        res.status(200).json({
            tasks,
            currentPage,
            totalPages: Math.ceil(totalTasks / tasksPerPage),
            totalTasks
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get one task - only if it belongs to logged-in user
const getTaskById = async (req, res) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({
            message: "Invalid task ID"
        });
    }
};


// Create task - automatically assign logged-in user
const createTask = async (req, res) => {
    try {

        const task = await Task.create({
            ...req.body,
            user: req.user.userId
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// Update task - only user's own task
const updateTask = async (req, res) => {
    try {

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// Delete task - only user's own task
const deleteTask = async (req, res) => {
    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const getTaskStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const total = await Task.countDocuments({
            user: userId
        });

        const todo = await Task.countDocuments({
            user: userId,
            status: "TODO"
        });

        const inProgress = await Task.countDocuments({
            user: userId,
            status: "IN PROGRESS"
        });

        const completed = await Task.countDocuments({
            user: userId,
            status: "COMPLETED"
        });

        res.status(200).json({
            total,
            todo,
            inProgress,
            completed
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getTaskAnalytics = async (req, res) => {
    try {
       const userId = new mongoose.Types.ObjectId(req.user.userId);

        const byPriority = await Task.aggregate([
            {
                $match: {
                    user: userId
                }
            },
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                }
            }
        ]);

        const byStatus = await Task.aggregate([
            {
                $match: {
                    user: userId
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            byPriority,
            byStatus
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
    getTaskAnalytics
};