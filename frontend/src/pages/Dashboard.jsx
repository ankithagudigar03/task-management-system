import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <Header />

            <main className="dashboard-content">
                <button
                    className="add-task-button"
                    onClick={() => navigate("/tasks/new")}
                >
                    + Add New Task
                </button>
            </main>
        </div>
    );
}

export default Dashboard;