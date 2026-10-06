import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import TaskSummary from "../components/TaskSummary";
import EmptyTasks from "../components/EmptyTasks";
import { useTaskContext } from "../context/TaskContext";
import { logoutUser } from "../utils/auth";
import Analytics from "./Analytics";
import AdminDashboard from "./AdminDashboard";



function Tasks() {

    const navigate = useNavigate();

       const {
            tasks,
            loading,
            error,
            currentPage,
            totalPages,
            totalTasks,
            taskStats,
            fetchTasks,
            removeTask
        } = useTaskContext();

    const handleLogout = () => {
    logoutUser();
    navigate("/login");

};
    

    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    const [queryParams, setQueryParams] = useState({});
    const [pageGroup, setPageGroup] = useState(0);



            const handleSearch = (search) => {

            const updatedParams = {
                ...queryParams,
                search,
                page: 1
            };

            if (!search) {
                delete updatedParams.search;
            }

            setPageGroup(0);
            setQueryParams(updatedParams);
            fetchTasks(updatedParams);
        };

    const handleFilter = (filters) => {

    const updatedParams = {
        ...queryParams,
        page: 1
    };

    Object.keys(filters).forEach((key) => {

        if (filters[key]) {
            updatedParams[key] = filters[key];
        } else {
            delete updatedParams[key];
        }

    });

    setPageGroup(0);
    setQueryParams(updatedParams);
    fetchTasks(updatedParams);
};


const token = localStorage.getItem("token");

let isAdmin = false;

if (token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        isAdmin = payload.role === "ADMIN";
    } catch (error) {
        console.error("Invalid token");
    }
}



const handlePageChange = (page) => {
    const updatedParams = {
        ...queryParams,
        page
    };

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


              {isAdmin && (
                        <button
                            type="button"
                            className="admin-dashboard-link"
                            onClick={() => setShowAdmin(true)}
                        >
                            Admin Dashboard
                        </button>
                    )}

                    <button
                        className="analytics-button"
                        onClick={() => setShowAnalytics(true)}
                    >
                        📊 Analytics
                    </button>


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

    <TaskSummary taskStats={taskStats} />

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




{totalPages > 1 && (
    <div className="pagination">

        {/* Previous page */}
        <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => {
                const previousPage = currentPage - 1;

                // If going from 11 → 10, show pages 1–10
                if (previousPage % 10 === 0) {
                    setPageGroup(Math.floor((previousPage - 1) / 10));
                }

                handlePageChange(previousPage);
            }}
        >
            ← Previous
        </button>

        {/* Page numbers */}
        {Array.from(
            {
                length: Math.min(
                    10,
                    totalPages - pageGroup * 10
                )
            },
            (_, index) => {
                const pageNumber = pageGroup * 10 + index + 1;

                return (
                    <button
                        key={pageNumber}
                        type="button"
                        className={
                            currentPage === pageNumber
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handlePageChange(pageNumber)
                        }
                    >
                        {pageNumber}
                    </button>
                );
            }
        )}

        {/* Next page */}
        <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => {
                const nextPage = currentPage + 1;

                // If going from 10 → 11, show pages 11–20
                if (nextPage % 10 === 1) {
                    setPageGroup(Math.floor((nextPage - 1) / 10));
                }

                handlePageChange(nextPage);
            }}
        >
            Next →
        </button>

    </div>
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


            {showAnalytics && (
    <div className="analytics-overlay">
        <div className="analytics-modal">

            <button
                className="analytics-close"
                onClick={() => setShowAnalytics(false)}
            >
                ✕
            </button>

            <Analytics />

        </div>
    </div>
)}


{showAdmin && (
    <div className="admin-overlay">
        <div className="admin-modal">
            <button
                className="admin-close"
                onClick={() => setShowAdmin(false)}
            >
                ✕
            </button>

            <AdminDashboard />
        </div>
    </div>
)}

        </div>
    );
}

export default Tasks;