const User = require("../models/User");
const Task = require("../models/Task");

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const adminUsers = await User.countDocuments({
            role: "ADMIN"
        });

        const normalUsers = await User.countDocuments({
            $or: [
                { role: "USER" },
                { role: { $exists: false } }
            ]
        });

        const totalTasks = await Task.countDocuments();

        const completedTasks = await Task.countDocuments({
            status: "COMPLETED"
        });

        res.status(200).json({
            totalUsers,
            adminUsers,
            normalUsers,
            totalTasks,
            completedTasks
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAdminStats
};