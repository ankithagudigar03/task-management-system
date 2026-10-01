import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-tasks">
                <p>No tasks found.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;