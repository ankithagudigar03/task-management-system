import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats } from "../services/taskApi";
import "../styles/task.css";


function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        adminUsers: 0,
        normalUsers: 0,
        totalTasks: 0,
        completedTasks: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAdminStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin statistics:", error);
            }
        };

        fetchStats();
    }, []);

    const completionPercentage =
        stats.totalTasks > 0
            ? Math.round(
                  (stats.completedTasks / stats.totalTasks) * 100
              )
            : 0;

    const remainingTasks =
        stats.totalTasks - stats.completedTasks;

    return (
        <div className="admin-dashboard">

             {/* HEADER */}

              <div className="admin-header">

                            <div>
                                <h1>
                                    Dashboard Overview
                                </h1>

                                <p className="admin-subtitle">
                                    Monitor users, tasks and overall system activity.
                                </p>
                            </div>

                        </div>


            {/* STAT CARDS */}
            <div className="admin-stats">

                {/* TOTAL USERS */}
                <div className="admin-card">
                    <div className="admin-card-icon">
                        👥
                    </div>

                    <p>Total Users</p>

                    <h2>
                        {stats.totalUsers}
                    </h2>
                </div>


                {/* ADMIN USERS */}
                <div className="admin-card">
                    <div className="admin-card-icon">
                        👑
                    </div>

                    <p>Admin Users</p>

                    <h2>
                        {stats.adminUsers}
                    </h2>
                </div>


                {/* NORMAL USERS */}
                <div className="admin-card">
                    <div className="admin-card-icon">
                        👤
                    </div>

                    <p>Normal Users</p>

                    <h2>
                        {stats.normalUsers}
                    </h2>
                </div>


                {/* TOTAL TASKS */}
                <div className="admin-card">
                    <div className="admin-card-icon">
                        📋
                    </div>

                    <p>Total Tasks</p>

                    <h2>
                        {stats.totalTasks}
                    </h2>
                </div>

            </div>


            {/* BOTTOM SECTION */}
            <div className="admin-bottom">


                {/* TASK PERFORMANCE */}
                <div className="admin-panel">

                    <div className="panel-header">

                        <div>
                            <p className="panel-label">
                                TASK PERFORMANCE
                            </p>

                            <h2>
                                Task Completion
                            </h2>
                        </div>

                        <span className="completion-number">
                            {completionPercentage}%
                        </span>

                    </div>


                    {/* PROGRESS BAR */}
                    <div className="progress-container">

                        <div
                            className="progress-bar"
                            style={{
                                width: `${completionPercentage}%`
                            }}
                        ></div>

                    </div>


                    {/* COMPLETION INFO */}
                    <div className="completion-info">

                        <span>
                            <strong>
                                {stats.completedTasks}
                            </strong>{" "}
                            completed
                        </span>

                        <span>
                            <strong>
                                {remainingTasks}
                            </strong>{" "}
                            remaining
                        </span>

                    </div>

                </div>


                {/* SYSTEM OVERVIEW */}
                <div className="admin-panel">

                    <p className="panel-label">
                        SYSTEM OVERVIEW
                    </p>

                    <h2>
                        Platform Status
                    </h2>


                    <div className="status-item">

                        <span className="status-dot"></span>

                        <span>
                            Backend API
                        </span>

                        <strong>
                            Online
                        </strong>

                    </div>


                    <div className="status-item">

                        <span className="status-dot"></span>

                        <span>
                            Database
                        </span>

                        <strong>
                            Connected
                        </strong>

                    </div>


                    <div className="status-item">

                        <span className="status-dot"></span>

                        <span>
                            Authentication
                        </span>

                        <strong>
                            Active
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;