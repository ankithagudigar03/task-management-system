import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { useTaskContext } from "../context/TaskContext";

function Tasks() {
    const {
        tasks,
        loading,
        error,
        fetchTasks,
        removeTask
    } = useTaskContext();

    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

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

    const handleEdit = (task) => {
        navigate("/tasks/new", {
            state: {
                editingTask: task
            }
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        await removeTask(id);
    };

    return (
        <div className="tasks-page">

            {/* MY TASKS HEADER */}
            <header className="header-minimal">
                <div className="minimal-header-content">

                    <h2>My Tasks</h2>

              <nav className="header-nav">
            <button onClick={() => navigate("/tasks/new")}>
                Add Task
            </button>

            <button onClick={() => navigate("/tasks")}>
                My Tasks
            </button>
        </nav>

                </div>
            </header>

            <main className="dashboard-content">

                <section className="task-controls">
                    <SearchBar onSearch={handleSearch} />
                    <FilterBar onFilter={handleFilter} />
                </section>

                {loading && (
                    <p className="loading">
                        Loading tasks...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {!loading && (
                    <TaskList
                        tasks={tasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

            </main>

        </div>
    );
}

export default Tasks;