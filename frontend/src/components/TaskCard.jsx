function TaskCard({ task, onView, onEdit, onDelete, colorIndex }) {

    const handleCardClick = () => {
        onView(task);
    };

    // STATUS ICON
    const getStatusIcon = () => {
        if (task.status === "TODO") {
            return "📋";
        }

        if (task.status === "IN PROGRESS") {
            return "⚙️";
        }

        if (task.status === "COMPLETED") {
            return "✓";
        }

        return "📋";
    };

    // STATUS CLASS
    const getStatusClass = () => {
        if (task.status === "TODO") {
            return "todo";
        }

        if (task.status === "IN PROGRESS") {
            return "in-progress";
        }

        if (task.status === "COMPLETED") {
            return "completed";
        }

        return "todo";
    };

    return (
        <div
    className={`task-card task-color-${colorIndex % 6}`}
    onClick={handleCardClick}
>

            {/* HEADER */}
            <div className="task-card-header">

                <div className="task-title-area">

                    <div className={`task-icon ${getStatusClass()}`}>
                        {getStatusIcon()}
                    </div>

                    <div className="task-title-content">

                        <h3>
                            {task.title}
                        </h3>

                        <p className="task-description">
                            {task.description || "No description"}
                        </p>

                    </div>

                </div>

                {/* PRIORITY */}
                <span
                    className={`priority ${task.priority.toLowerCase()}`}
                >
                    {task.priority}
                </span>

            </div>


            {/* TASK INFORMATION */}
            <div className="task-info">

                <span>
                    <span className="info-icon status-info-icon">
                        {getStatusIcon()}
                    </span>

                    <span>
                        Status: {task.status}
                    </span>
                </span>


                <span>
                    <span className="info-icon assigned-info-icon">
                        👤
                    </span>

                    <span>
                        Assigned to: {task.assignedTo || "Not assigned"}
                    </span>
                </span>


                {task.dueDate && (
                    <span>
                        <span className="info-icon date-info-icon">
                            📅
                        </span>

                        <span>
                            Due:{" "}
                            {new Date(
                                task.dueDate
                            ).toLocaleDateString()}
                        </span>
                    </span>
                )}


             {task.tags && task.tags.length > 0 && (
                    <span>
                        <span className="info-icon">
                            🔖
                        </span>

                        <span>
                            Tags: {task.tags.join(", ")}
                        </span>
                    </span>
                )}

            </div>


            {/* BUTTONS */}
            <div className="task-actions">

                <button
                    type="button"
                    className="edit-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onEdit(task);
                    }}
                >
                    🖊️ Edit
                </button>


                <button
                    type="button"
                    className="delete-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete(task._id);
                    }}
                >
                    🗑 Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;