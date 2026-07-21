import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes";
import Docentes from "./pages/Docentes";
import Cursos from "./pages/Cursos";

import ProtectedRoute from "./routes/ProtectedRoute";

function App(){

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login/>}
                />

                <Route
                    path="/login"
                    element={<Login/>}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/estudiantes"
                    element={
                        <ProtectedRoute>
                            <Estudiantes/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/docentes"
                    element={
                        <ProtectedRoute>
                            <Docentes/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cursos"
                    element={
                        <ProtectedRoute>
                            <Cursos/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace/>}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;