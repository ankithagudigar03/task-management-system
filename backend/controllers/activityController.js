
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

module.exports = { getActivities };
