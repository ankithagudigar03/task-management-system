const Task = require("../models/Task");

// Get all tasks - only logged-in user's tasks
const getTasks = async (req, res) => {
    try {
        const {
            search,
            status,
            priority,
            assignedTo,
            dueDate
        } = req.query;

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

        const tasks = await Task.find(filter)
            .sort({ updatedAt: -1 });

        res.status(200).json(tasks);

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


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};