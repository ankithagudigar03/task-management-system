import "./styles/task.css";

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
                        element={<Tasks />}
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