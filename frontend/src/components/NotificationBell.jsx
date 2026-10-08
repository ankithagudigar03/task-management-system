import { useEffect, useRef, useState } from "react";
import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} from "../services/notificationApi";

function NotificationBell() {

    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const notificationRef = useRef(null);

    const loadNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        }
    };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
        loadNotifications();
    }, 5000);

    return () => clearInterval(interval);
}, []);



useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            notificationRef.current &&
            !notificationRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
    };
}, []);


    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification._id === id
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    isRead: true
                }))
            );
        } catch (error) {
            console.error(
                "Failed to mark all notifications as read:",
                error
            );
        }
    };

    const handleDeleteNotification = async (id) => {
    try {
        await deleteNotification(id);

        setNotifications((prev) =>
            prev.filter(
                (notification) => notification._id !== id
            )
        );
    } catch (error) {
        console.error(
            "Failed to delete notification:",
            error
        );
    }
};

    return (
             <div
                className="notification-wrapper"
                ref={notificationRef}
            >
            <button
                type="button"
                className="notification-bell"
                onClick={() => setIsOpen(!isOpen)}
            >
                🔔

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>

                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={handleMarkAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <p className="no-notifications">
                            No notifications
                        </p>
                    ) : (
                        <div className="notification-list">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`notification-item ${
                                        notification.isRead
                                            ? "read"
                                            : "unread"
                                    } ${
                                        notification.type === "OVERDUE"
                                            ? "overdue"
                                            : notification.type === "DUE_TOMORROW"
                                            ? "due-tomorrow"
                                            : "due-today"
                                    }`}
                                >
                                    <div className="notification-icon">
                                            {notification.type === "OVERDUE"
                                                ? "⚠️"
                                                : notification.type === "DUE_TOMORROW"
                                                ? "🔔"
                                                : "📅"}
                                        </div>

                                    <div className="notification-content">
                                        <p>{notification.message}</p>

                                        {!notification.isRead && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleMarkAsRead(
                                                        notification._id
                                                    )
                                                }
                                            >
                                                Mark as read
                                            </button>
                                        )}

                                        {notification.isRead && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteNotification(
                                                    notification._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}
                                                                        </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
    
}

export default NotificationBell;