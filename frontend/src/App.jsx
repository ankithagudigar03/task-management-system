import "./styles/task.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { lazy, Suspense } from "react";

import Loading from "./components/Loading";


// Lazy loaded page
const Tasks = lazy(() => import("./pages/Tasks"));


function App() {
    return (
        <BrowserRouter>

            <Suspense fallback={<Loading />}>

                 <Routes>

              <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                }
            />

                <Route
                    path="/login"
                    element={<Login />}
                />

              <Route
                        path="/register"
                        element={<Register />}
                    />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>

            </Suspense>

        </BrowserRouter>
    );
}

export default App;