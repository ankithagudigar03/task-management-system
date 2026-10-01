import { useNavigate } from "react-router-dom";

function TaskCard({ task, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handleTaskClick = () => {
        navigate(`/tasks/${task._id}`);
    };

    return (
        <div className="task-card">
            <div
                className="task-card-header"
                onClick={handleTaskClick}
                style={{ cursor: "pointer" }}
            >
                <h3>{task.title}</h3>

                <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </div>

            <p className="task-description">
                {task.description}
            </p>

            <div className="task-info">
                <span>
                    Status: {task.status}
                </span>

                <span>
                    Assigned to: {task.assignedTo || "Not assigned"}
                </span>

                {task.dueDate && (
                    <span>
                        Due:{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>

            <div className="task-actions">
    <button
        className="edit-button"
        onClick={() => onEdit(task)}
    >
        Edit
    </button>

    <button
        className="delete-button"
        onClick={() => onDelete(task._id)}
    >
        Delete
    </button>
</div>
        </div>
    );
}

export default TaskCard;