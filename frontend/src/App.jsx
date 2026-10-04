import "./styles/task.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Tasks from "./pages/Tasks";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Tasks />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;