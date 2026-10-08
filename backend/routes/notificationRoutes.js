const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} = require("../controllers/notificationController");

router.get(
    "/",
    authMiddleware,
    getNotifications
);

router.patch(
    "/:id/read",
    authMiddleware,
    markNotificationAsRead
);

router.patch(
    "/read-all",
    authMiddleware,
    markAllNotificationsAsRead
);

router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;