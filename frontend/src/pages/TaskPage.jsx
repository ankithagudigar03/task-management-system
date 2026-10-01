import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import { getTaskById } from "../services/taskApi";

function TaskPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true);

                const data = await getTaskById(id);
                setTask(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (loading) {
        return <p>Loading task...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <TaskDetails
            task={task}
            onClose={() => navigate("/tasks")}
        />
    );
}

export default TaskPage;