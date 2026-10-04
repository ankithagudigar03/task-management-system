import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    onView,
    onEdit,
    onDelete
}) {
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
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default TaskList;