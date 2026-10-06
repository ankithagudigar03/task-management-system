import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { getTaskAnalytics } from "../services/taskApi";
import "../styles/task.css";

function Analytics() {
    const navigate = useNavigate();

    const [analytics, setAnalytics] = useState({
        byPriority: [],
        byStatus: []
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getTaskAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error("Failed to fetch task analytics:", error);
            }
        };

        fetchAnalytics();
    }, []);

    const priorityData = analytics.byPriority.map((item) => ({
        name: item._id,
        count: item.count
    }));

    const statusData = analytics.byStatus.map((item) => ({
        name: item._id,
        count: item.count
    }));

    const totalTasks = statusData.reduce(
        (total, item) => total + item.count,
        0
    );

    const completedTasks =
        statusData.find((item) => item.name === "COMPLETED")?.count || 0;

    const inProgressTasks =
        statusData.find((item) => item.name === "IN PROGRESS")?.count || 0;

    const todoTasks =
        statusData.find((item) => item.name === "TODO")?.count || 0;

    const completionPercentage =
        totalTasks > 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

    return (
        <div className="analytics-page">

            <div className="analytics-header">
                <div>
                    <h1>Task Analytics</h1>
                    <p>
                        Analyze your task progress and activity.
                    </p>
                </div>

            
            </div>

            <div className="analytics-summary">

                <div className="analytics-card">
                    <span className="analytics-icon">📊</span>
                    <p>Total Tasks</p>
                    <h2>{totalTasks}</h2>
                </div>

                <div className="analytics-card">
                    <span className="analytics-icon">✅</span>
                    <p>Completed</p>
                    <h2>{completedTasks}</h2>
                </div>

                <div className="analytics-card">
                    <span className="analytics-icon">⏳</span>
                    <p>In Progress</p>
                    <h2>{inProgressTasks}</h2>
                </div>

                <div className="analytics-card">
                    <span className="analytics-icon">📝</span>
                    <p>To Do</p>
                    <h2>{todoTasks}</h2>
                </div>

            </div>

            <div className="analytics-grid">

                <div className="analytics-panel">
                    <div className="analytics-panel-header">
                        <div>
                            <p className="analytics-label">
                                PRIORITY
                            </p>
                            <h2>Tasks by Priority</h2>
                        </div>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={priorityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />

                   <Bar
                            dataKey="count"
                            radius={[8, 8, 0, 0]}
                        >
                            {priorityData.map((entry, index) => {
                                const colors = {
                                    LOW: "#22c55e",
                                    MEDIUM: "#f59e0b",
                                    HIGH: "#ef4444"
                                };

                                return (
                                    <Cell
                                        key={`priority-${index}`}
                                        fill={colors[entry.name] || "#5665df"}
                                    />
                                );
                            })}
                        </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-panel">
                    <div className="analytics-panel-header">
                        <div>
                            <p className="analytics-label">
                                STATUS
                            </p>
                            <h2>Tasks by Status</h2>
                        </div>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={105}
                                    innerRadius={55}
                                    paddingAngle={3}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                [
                                                    "#5665df",
                                                    "#f59e0b",
                                                    "#22c55e"
                                                ][index % 3]
                                            }
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="completion-panel">

                <div>
                    <p className="analytics-label">
                        OVERALL PERFORMANCE
                    </p>

                    <h2>Completion Rate</h2>

                    <p className="completion-description">
                        You have completed {completedTasks} out of{" "}
                        {totalTasks} tasks.
                    </p>
                </div>

                <div className="completion-rate">
                    <strong>{completionPercentage}%</strong>
                    <span>completed</span>
                </div>

            </div>

        </div>
    );
}

export default Analytics;