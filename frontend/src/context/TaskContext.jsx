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

            setTasks(data);

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
    // ADD TASK
    // =========================

    const addTask = async (task) => {

        try {

            setError("");

            const newTask = await createTask(task);

            setTasks((prevTasks) => [
                ...prevTasks,
                newTask
            ]);

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
    }

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