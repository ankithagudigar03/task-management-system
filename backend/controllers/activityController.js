
const Activity = require("../models/Activity");

// Get activity history for the logged-in user
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({
            user: req.user.userId
        })
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete one activity record for the logged-in user
const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!activity) {
            return res.status(404).json({
                message: "Activity not found"
            });
        }

        res.status(200).json({
            message: "Activity deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { getActivities, deleteActivity };
