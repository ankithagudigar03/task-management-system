const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user.userId
        })
            .populate("task", "title dueDate status")
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                isRead: true
            },
            {
                new: true
            }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        res.status(200).json(notification);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                user: req.user.userId,
                isRead: false
            },
            {
                isRead: true
            }
        );

        res.status(200).json({
            message: "All notifications marked as read"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        res.status(200).json({
            message: "Notification deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
};