import "./styles/task.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AddTask from "./pages/AddTask";
import Tasks from "./pages/Tasks";
import TaskPage from "./pages/TaskPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* First page = Add Task */}
                <Route
                    path="/"
                    element={<AddTask />}
                />

                {/* My Tasks */}
                <Route
                    path="/tasks"
                    element={<Tasks />}
                />

                {/* Add Task */}
                <Route
                    path="/tasks/new"
                    element={<AddTask />}
                />

                {/* Task Details */}
                <Route
                    path="/tasks/:id"
                    element={<TaskPage />}
                />

                {/* Any unknown URL */}
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;