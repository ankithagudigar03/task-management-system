import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";

function AddTask() {
    const location = useLocation();

    const editingTask = location.state?.editingTask || null;

    return (
        <div className="dashboard">
            <Header />

            <main className="dashboard-content">
                <TaskForm
                    editingTask={editingTask}
                    onCancelEdit={() => window.history.back()}
                />
            </main>
        </div>
    );
}

export default AddTask;