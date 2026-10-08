const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;


// =========================
// GET TOKEN
// =========================

const getToken = () => {
    return localStorage.getItem("token");
};


// =========================
// GET ALL TASKS
// =========================

export const getTasks = async (params = {}) => {

    const query = new URLSearchParams(params).toString();

    const response = await fetch(
        `${API_URL}${query ? `?${query}` : ""}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
};


// =========================
// GET ONE TASK
// =========================

export const getTaskById = async (id) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch task");
    }

    return response.json();
};


// =========================
// CREATE TASK
// =========================

export const createTask = async (task) => {

    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify(task)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
};


// =========================
// UPDATE TASK
// =========================

export const updateTask = async (id, task) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify(task)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
};


// =========================
// DELETE TASK
// =========================

export const deleteTask = async (id) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
};


export const getTaskStats = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/stats`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch task statistics");
    }

    return response.json();
};





export const getTaskAnalytics = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/analytics`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch task analytics");
    }

    return response.json();
};




export const getAdminStats = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/stats`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch admin statistics");
    }

    return response.json();
};


// =========================
// GET COMMENTS
// =========================

export const getComments = async (taskId) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/task/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    return response.json();
};


// =========================
// CREATE COMMENT
// =========================

export const createComment = async (taskId, text) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/task/${taskId}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify({
                text
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create comment");
    }

    return response.json();
};


// =========================
// DELETE COMMENT
// =========================

export const deleteComment = async (commentId) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/${commentId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete comment");
    }

    return response.json();
};

export const uploadAttachment = async (taskId, file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attachments/task/${taskId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("Attachment upload error:", data);
        throw new Error(data.message || "Failed to upload attachment");
    }

    return data;
};