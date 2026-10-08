import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { uploadAttachment } from "../services/taskApi";
function TaskForm({
    editingTask,
    onCancelEdit,
    onTaskSaved
}) {

    const { addTask, editTask } = useTaskContext();

const [isSubmitting, setIsSubmitting] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);

   const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assignedTo: "",
    dueDate: "",
    tags: []
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
                            : "",
                        tags: editingTask.tags || []
            });
        } else {
           setFormData({
                    title: "",
                    description: "",
                    status: "TODO",
                    priority: "MEDIUM",
                    assignedTo: "",
                    dueDate: "",
                    tags: []
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

    setIsSubmitting(true);

    try {
        let savedTask;

                if (editingTask) {
                    savedTask = await editTask(editingTask._id, formData);
                } else {
                    savedTask = await addTask(formData);
                }

                if (selectedFile && savedTask?._id) {
                    await uploadAttachment(savedTask._id, selectedFile);
                }

        // Refresh task list immediately
        if (onTaskSaved) {
            await onTaskSaved();
        }

        // Close popup after saving
        onCancelEdit();

    } catch (error) {
        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            <h2>
                {editingTask ? "Edit Task" : "Add New Task"}
            </h2>


{/* TASK TITLE */}
            <div className="form-field">

                <span className="form-field-icon">
                    🏷️
                </span>

                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

            </div>


            {/* TASK DESCRIPTION */}
            <div className="form-field textarea-field">

                <span className="form-field-icon">
                    📄
                </span>

                <textarea
                    name="description"
                    placeholder="Task description"
                    value={formData.description}
                    onChange={handleChange}
                />

            </div>




           <div className={`form-field status-field ${formData.status.toLowerCase().replace(" ", "-")}`}>
    <span className="form-field-icon">
        {formData.status === "TODO" && "📋"}
        {formData.status === "IN PROGRESS" && "⚙️"}
        {formData.status === "COMPLETED" && "✅"}
    </span>

    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
    >
        <option value="TODO">TODO</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
    </select>
</div>




<div className={`form-field priority-field ${formData.priority.toLowerCase()}`}>
    <span className="form-field-icon">
        {formData.priority === "LOW" && "🟢"}
        {formData.priority === "MEDIUM" && "🟡"}
        {formData.priority === "HIGH" && "🔴"}
    </span>

    <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
    >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
    </select>
</div>



<div className="form-field">
    <span className="form-field-icon">👤</span>


    <input
        type="text"
        name="assignedTo"
        placeholder="Assigned to"
        value={formData.assignedTo}
        onChange={handleChange}
    />
</div>

            
            <div className="form-field date-field">

    <span
        className="form-field-icon calendar-icon"
        onClick={(e) =>
            e.currentTarget.nextElementSibling.showPicker()
        }
    >
        📅
    </span>

    <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
    />

</div>



<div className="form-group">
    <label>🔖 Tags</label>

    <input
        type="text"
        name="tags"
        placeholder="Enter tags separated by commas"
        value={(formData.tags || []).join(", ")}
        onChange={(event) => {
            const tags = event.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

            setFormData({
                ...formData,
                tags
            });
        }}
    />
</div>

<div className="form-group">
    <label>📎 Attachment</label>

    <input
        type="file"
        onChange={(event) => {
            setSelectedFile(event.target.files[0] || null);
        }}
    />

    {selectedFile && (
        <p>
            Selected: {selectedFile.name}
        </p>
    )}
</div>


            <div className="form-actions">

                  <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="submit-spinner"></span>
                                {editingTask ? "Updating..." : "Adding..."}
                            </>
                        ) : (
                            editingTask ? "Update Task" : "Add Task"
                        )}
                    </button>

    

            </div>

        </form>
    );
}

export default TaskForm;