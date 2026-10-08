const getToken = () => {
    return localStorage.getItem("token");
};

const API_URL = import.meta.env.VITE_API_URL;

export const getNotifications = async () => {
    const response = await fetch(
        `${API_URL}/api/notifications`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch notifications"
        );
    }

    return data;
};

export const markNotificationAsRead = async (id) => {
    const response = await fetch(
        `${API_URL}/api/notifications/${id}/read`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to mark notification as read"
        );
    }

    return data;
};

export const markAllNotificationsAsRead = async () => {
    const response = await fetch(
        `${API_URL}/api/notifications/read-all`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to mark all notifications as read"
        );
    }

    return data;
};



export const deleteNotification = async (id) => {
    const token = getToken();

    const response = await fetch(
        `${API_URL}/api/notifications/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete notification");
    }

    return response.json();
};