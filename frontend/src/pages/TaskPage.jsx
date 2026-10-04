import TaskDetails from "../components/TaskDetails";

function TaskPage({ task, onClose }) {
    if (!task) {
        return null;
    }

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="task-modal task-details-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <TaskDetails
                    task={task}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}

export default TaskPage;