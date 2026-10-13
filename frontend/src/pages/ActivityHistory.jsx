
import { useEffect, useState } from "react";
import "../styles/task.css";

function ActivityHistory() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/activities`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load activity history");
                }

                const data = await response.json();
                setActivities(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const getIcon = (action) => {
        switch (action) {
            case "CREATED":
                return "➕";
            case "UPDATED":
                return "✏️";
            case "COMPLETED":
                return "✅";
            case "DELETED":
                return "🗑️";
            default:
                return "📌";
        }
    };

    return (
        <div className="activity-history-page">
            <header className="activity-history-header">
                <h1>🕒 Activity History</h1>
                <p>Track your recent task activities.</p>
            </header>

            {loading && <p>Loading activities...</p>}

            {error && <p role="alert">{error}</p>}

            {!loading && !error && activities.length === 0 && (
                <p>No activity recorded yet.</p>
            )}

            {!loading && !error && activities.length > 0 && (
                <div className="activity-timeline">
                    {activities.map((activity) => (
                        <article
                            className="activity-item"
                            key={activity._id}
                        >
                            <span className="activity-icon">
                                {getIcon(activity.action)}
                            </span>

                            <div className="activity-details">
                                <h3>{activity.taskTitle}</h3>
                                <p>{activity.description}</p>
                                <small>
                                    {new Date(
                                        activity.createdAt
                                    ).toLocaleString()}
                                </small>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ActivityHistory;
