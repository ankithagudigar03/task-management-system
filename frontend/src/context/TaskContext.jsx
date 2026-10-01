import { createContext, useContext, useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskApi";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch tasks
    const fetchTasks = async (params = {}) => {
        try {
            setLoading(true);
            setError("");

            const data = await getTasks(params);
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add task
    const addTask = async (task) => {
    try {
        setError("");

        const newTask = await createTask(task);

        setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
        setError(err.message);
        throw err;
    }
};
    // Edit task
    const editTask = async (id, task) => {
    try {
        setError("");

        const updatedTask = await updateTask(id, task);

        setTasks((prevTasks) =>
            prevTasks.map((item) =>
                item._id === id ? updatedTask : item
            )
        );
    } catch (err) {
        setError(err.message);
        throw err;
    }
};

    // Remove task
    const removeTask = async (id) => {
    try {
        setError("");

        await deleteTask(id);

        setTasks((prevTasks) =>
            prevTasks.filter((item) => item._id !== id)
        );
    } catch (err) {
        setError(err.message);
        throw err;
    }
};

    // Load tasks when app starts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                fetchTasks,
                addTask,
                editTask,
                removeTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    return useContext(TaskContext);
};