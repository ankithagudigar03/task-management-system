function TaskSummary({ tasks = [] }) {

    const total = tasks.length;

    const todo = tasks.filter(
        (task) => task.status === "TODO"
    ).length;

    const inProgress = tasks.filter(
        (task) => task.status === "IN PROGRESS"
    ).length;

    const completed = tasks.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    return (
        <div className="task-summary">

            <div className="summary-card total">
    <div className="summary-icon">
        📊
    </div>

                <div className="summary-content">
                    <span>Total Tasks</span>
                    <strong>{total}</strong>
                </div>
            </div>


            <div className="summary-card todo">
                <div className="summary-icon">📋</div>

                <div className="summary-content">
                    <span>TODO</span>
                    <strong>{todo}</strong>
                </div>
            </div>


            <div className="summary-card progress">
                <div className="summary-icon">⚙️</div>

                <div className="summary-content">
                    <span>In Progress</span>
                    <strong>{inProgress}</strong>
                </div>
            </div>


            <div className="summary-card completed">
                <div className="summary-icon">✓</div>

                <div className="summary-content">
                    <span>Completed</span>
                    <strong>{completed}</strong>
                </div>
            </div>

        </div>
    );
}

export default TaskSummary;