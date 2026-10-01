const API_URL = "http://localhost:5000/api/tasks";

// Get all tasks
export const getTasks = async (params = {}) => {
    const query = new URLSearchParams(params).toString();

    const response = await fetch(
        `${API_URL}${query ? `?${query}` : ""}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
};

// Get one task
export const getTaskById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch task");
    }

    return response.json();
};

// Create task
export const createTask = async (task) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
};

// Update task
export const updateTask = async (id, task) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
};

// Delete task
export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
};