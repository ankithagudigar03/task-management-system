import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

function TaskForm({ editingTask, onCancelEdit }) {
    const { addTask, editTask } = useTaskContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        assignedTo: "",
        dueDate: ""
    });

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title || "",
                description: editingTask.description || "",
                status: editingTask.status || "TODO",
                priority: editingTask.priority || "MEDIUM",
                assignedTo: editingTask.assignedTo || "",
                dueDate: editingTask.dueDate
                    ? editingTask.dueDate.split("T")[0]
                    : ""
            });
        } else {
            setFormData({
                title: "",
                description: "",
                status: "TODO",
                priority: "MEDIUM",
                assignedTo: "",
                dueDate: ""
            });
        }
    }, [editingTask]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        try {
            if (editingTask) {
                await editTask(editingTask._id, formData);

                navigate("/tasks");
            } else {
                await addTask(formData);

                setFormData({
                    title: "",
                    description: "",
                    status: "TODO",
                    priority: "MEDIUM",
                    assignedTo: "",
                    dueDate: ""
                });

                navigate("/tasks");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

            <input
                type="text"
                name="title"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Task description"
                value={formData.description}
                onChange={handleChange}
            />

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="TODO">TODO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            <input
                type="text"
                name="assignedTo"
                placeholder="Assigned to"
                value={formData.assignedTo}
                onChange={handleChange}
            />

            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
            />

            <div className="form-actions">
                <button type="submit">
                    {editingTask ? "Update Task" : "Add Task"}
                </button>

                {editingTask && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default TaskForm;