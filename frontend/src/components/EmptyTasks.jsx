function EmptyTasks({ onAddTask }) {
    return (
        <div className="empty-tasks">

            <div className="empty-task-icon">
                📋
            </div>

            <h2>No tasks found</h2>

            <p>
                Create your first task to get started.
            </p>

            <button
                type="button"
                className="empty-add-button"
                onClick={onAddTask}
            >
                + Add Task
            </button>

        </div>
    );
}

export default EmptyTasks;