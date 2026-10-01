function TaskDetails({ task, onClose }) {
    if (!task) {
        return null;
    }

    return (
        <div className="task-details-overlay">
            <div className="task-details">
                <button
                    className="close-button"
                    onClick={onClose}
                >
                    ×
                </button>

                <div className="task-details-header">
                    <h2>{task.title}</h2>

                    <span
                        className={`priority ${task.priority.toLowerCase()}`}
                    >
                        {task.priority}
                    </span>
                </div>

                <div className="details-section">
                    <h3>Description</h3>
                    <p>
                        {task.description || "No description"}
                    </p>
                </div>

                <div className="details-grid">
                    <div>
                        <strong>Status</strong>
                        <span>{task.status}</span>
                    </div>

                    <div>
                        <strong>Assigned To</strong>
                        <span>
                            {task.assignedTo || "Not assigned"}
                        </span>
                    </div>

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

                <button
                    className="close-details"
                    onClick={onClose}
                >
                    Back to Tasks
                </button>
            </div>
        </div>
    );
}

export default TaskDetails;