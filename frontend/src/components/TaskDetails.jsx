function TaskDetails({ task, onClose }) {
    if (!task) {
        return null;
    }

    return (
        <div className="task-details">

            {/* Header */}
            <div className="task-details-header">

                <div className="details-title">
                   <span
    className={`details-task-icon status-${task.status
        .toLowerCase()
        .replace(" ", "-")}`}
>
    {task.status === "TODO" && "📋"}

    {task.status === "IN PROGRESS" && "⚙️"}

    {task.status === "COMPLETED" && "✓"}
</span>
                    <div>
                        <h2>{task.title}</h2>

                        <span
                            className={`priority ${task.priority.toLowerCase()}`}
                        >
                            {task.priority}
                        </span>
                    </div>
                </div>

                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

            </div>

            {/* Description */}
            <div className="details-section">

                <h3>
                    📝 Description
                </h3>

                <div className="description-box">
                    {task.description || "No description"}
                </div>

            </div>

            {/* Task Information */}
            <div className="details-grid">

                <div className="detail-item">

    <span
        className={`detail-icon status-icon status-${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
    >
        {task.status === "TODO" && "📋"}

        {task.status === "IN PROGRESS" && "⚙️"}

        {task.status === "COMPLETED" && "✓"}
    </span>

    <div>
        <strong>Status</strong>

        <span className="status-value">
            {task.status}
        </span>
    </div>

</div>

                <div className="detail-item">
                    <span className="detail-icon">
                        👤
                    </span>

                    <div>
                        <strong>Assigned To</strong>
                        <span>
                            {task.assignedTo || "Not assigned"}
                        </span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">
                        📅
                    </span>

                    <div>
                        <strong>Due Date</strong>
                        <span>
                            {task.dueDate
                                ? new Date(
                                      task.dueDate
                                  ).toLocaleDateString()
                                : "No due date"}
                        </span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">
                        🕐
                    </span>

                    <div>
                        <strong>Created</strong>
                        <span>
                            {task.createdAt
                                ? new Date(
                                      task.createdAt
                                  ).toLocaleString()
                                : "-"}
                        </span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">
                        🔄
                    </span>

                    <div>
                        <strong>Last Updated</strong>
                        <span>
                            {task.updatedAt
                                ? new Date(
                                      task.updatedAt
                                  ).toLocaleString()
                                : "-"}
                        </span>
                    </div>
                </div>

            </div>
<button
    className="close-details"
    onClick={onClose}
>
    ← Back to Tasks
</button>
        </div>
    );
}

export default TaskDetails;