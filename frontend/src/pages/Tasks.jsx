import { useState } from "react";

import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import TaskSummary from "../components/TaskSummary";
import EmptyTasks from "../components/EmptyTasks";
import { useTaskContext } from "../context/TaskContext";
import { logoutUser } from "../utils/auth";


function Tasks() {

    const {
        tasks,
        loading,
        error,
        fetchTasks,
        removeTask
    } = useTaskContext();

    const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
};

    const [showAddTask, setShowAddTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    const [queryParams, setQueryParams] = useState({});



    const handleSearch = (search) => {

        const updatedParams = {
            ...queryParams,
            search
        };

        if (!search) {
            delete updatedParams.search;
        }

        setQueryParams(updatedParams);
        fetchTasks(updatedParams);
    };


    const handleFilter = (filters) => {

        const updatedParams = {
            ...queryParams
        };

        Object.keys(filters).forEach((key) => {

            if (filters[key]) {
                updatedParams[key] = filters[key];
            } else {
                delete updatedParams[key];
            }

        });

        setQueryParams(updatedParams);
        fetchTasks(updatedParams);
    };


    const handleViewTask = (task) => {
        setSelectedTask(task);
    };


    const handleEdit = (task) => {
        setEditingTask(task);
    };


    const handleDelete = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
        return;
    }

    try {
        await removeTask(id);

        // Refresh the current filtered/search results
        await fetchTasks(queryParams);

        if (selectedTask?._id === id) {
            setSelectedTask(null);
        }

    } catch (error) {
        console.error(error);
    }
};

    return (
        <div className="tasks-page">


            {/* HEADER */}

            <header className="header-minimal">

                <div className="minimal-header-content">

                    <div className="brand">

                        <div className="brand-icon">
    <img src="/task-header.png" alt="My Tasks" />
</div>

                        <div>
                            <h1>My Tasks</h1>
                            <p>Stay organized and get more done</p>
                        </div>

                    </div>


                     <div className="header-actions">

                        <button
                            type="button"
                            className="add-task-button"
                            onClick={() => setShowAddTask(true)}
                        >
                            + Add Task
                        </button>

                        <button
    type="button"
    className="logout-button"
    onClick={handleLogout}
>
    <svg
        className="logout-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 17L15 12L10 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M15 12H3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />

        <path
            d="M21 3V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>

    Logout
</button>

                    </div>
                </div>

            </header>


            {/* MAIN */}

          <main className="dashboard-content">

    <TaskSummary tasks={tasks} />

    <SearchBar
        onSearch={handleSearch}
    />

    <FilterBar
        onFilter={handleFilter}
    />

{loading && tasks.length === 0 && (
    <div className="loading-state">

        <div className="loading-spinner"></div>

        <h3>Loading tasks...</h3>

        <p>Fetching your tasks</p>

    </div>
)}

{error && (
    <div className="error-message">

        <div className="error-icon">
            ⚠️
        </div>

        <div className="error-content">
            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
                type="button"
                onClick={() => fetchTasks(queryParams)}
            >
                ↻ Try Again
            </button>
        </div>

    </div>
)}

{tasks.length > 0 ? (
    <TaskList
        tasks={tasks}
        onView={handleViewTask}
        onEdit={handleEdit}
        onDelete={handleDelete}
    />
) : (
    !loading && (
        <EmptyTasks
            onAddTask={() => setShowAddTask(true)}
        />
    )
)}

            </main>


            {/* ADD TASK */}

            {showAddTask && (

                <div
                    className="modal-overlay"
                    onClick={() => setShowAddTask(false)}
                >

                    <div
                        className="task-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="modal-close"
                            onClick={() =>
                                setShowAddTask(false)
                            }
                        >
                            ×
                        </button>

                        <TaskForm
    editingTask={null}
    onCancelEdit={() =>
        setShowAddTask(false)
    }
    onTaskSaved={() =>
        fetchTasks(queryParams)
    }
/>
                    </div>

                </div>

            )}


            {/* EDIT TASK */}

            {editingTask && (

                <div
                    className="modal-overlay"
                    onClick={() => setEditingTask(null)}
                >

                    <div
                        className="task-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="modal-close"
                            onClick={() =>
                                setEditingTask(null)
                            }
                        >
                            ×
                        </button>

                       <TaskForm
    editingTask={editingTask}
    onCancelEdit={() =>
        setEditingTask(null)
    }
    onTaskSaved={() =>
        fetchTasks(queryParams)
    }
/>

                    </div>

                </div>

            )}


            {/* TASK DETAILS */}

            {selectedTask && (

                <div
                    className="task-details-overlay"
                    onClick={() =>
                        setSelectedTask(null)
                    }
                >


                        <TaskDetails
                            task={selectedTask}
                            onClose={() =>
                                setSelectedTask(null)
                            }
                        />

                    </div>

                

            )}

        </div>
    );
}

export default Tasks;