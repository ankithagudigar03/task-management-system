import { createContext, useContext, useEffect, useState } from "react";

import {
    getTasks,
    getTaskStats,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskApi";


const TaskContext = createContext();


export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);

        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [totalTasks, setTotalTasks] = useState(0);
        const [taskStats, setTaskStats] = useState({
                total: 0,
                todo: 0,
                inProgress: 0,
                completed: 0
            });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =========================
    // ERROR MESSAGE HELPER
    // =========================

    const getErrorMessage = (err, defaultMessage) => {

        if (err?.message) {
            return err.message;
        }

        return defaultMessage;
    };


    // =========================
    // FETCH TASKS
    // =========================

    const fetchTasks = async (params = {}) => {

        try {

            setLoading(true);
            setError("");

                const data = await getTasks(params);

                setTasks(data.tasks);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setTotalTasks(data.totalTasks);

        } catch (err) {

            console.error("Fetch tasks error:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to load tasks."
                )
            );

        } finally {

            setLoading(false);

        }
    };



    // =========================
// FETCH TASK STATISTICS
// =========================

const fetchTaskStats = async () => {

    try {

        const data = await getTaskStats();

        setTaskStats(data);

    } catch (err) {

        console.error(
            "Failed to fetch task statistics:",
            err
        );

    }
};


  // =========================
// ADD TASK
// =========================

const addTask = async (task) => {

    try {

        setError("");

        const newTask = await createTask(task);

                    setTasks((prevTasks) => [
                newTask,
                ...prevTasks
            ]);

        await fetchTaskStats();

        return newTask;

    } catch (err) {

        console.error("Add task error:", err);

        setError(
            getErrorMessage(
                err,
                "Unable to add task."
            )
        );

        throw err;
    }
};


    // =========================
    // EDIT TASK
    // =========================

    const editTask = async (id, task) => {

        try {

            setError("");

            const updatedTask = await updateTask(
                id,
                task
            );

            setTasks((prevTasks) =>
                prevTasks.map((item) =>
                    item._id === id
                        ? updatedTask
                        : item
                )
            );

            await fetchTaskStats();

            return updatedTask;

        } catch (err) {

            console.error("Edit task error:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to update task."
                )
            );

            throw err;
        }
    };


    // =========================
    // DELETE TASK
    // =========================

    const removeTask = async (id) => {

        try {

            setError("");

            await deleteTask(id);

            setTasks((prevTasks) =>
                prevTasks.filter(
                    (item) => item._id !== id
                )
            );

            await fetchTaskStats();

        } catch (err) {

            console.error("Delete task error:", err);

            setError(
                getErrorMessage(
                    err,
                    "Unable to delete task."
                )
            );

            throw err;
        }
    };


    // =========================
    // LOAD TASKS ON START
    // =========================

    useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
        fetchTasks();
        fetchTaskStats();
    }

}, []);


    return (
        <TaskContext.Provider
                 value={{
                    tasks,
                    loading,
                    error,
                    currentPage,
                    totalPages,
                    totalTasks,
                    taskStats,
                    fetchTasks,
                    fetchTaskStats,
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