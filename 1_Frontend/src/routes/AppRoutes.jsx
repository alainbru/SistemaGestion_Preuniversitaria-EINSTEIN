import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Estudiantes from "../pages/Estudiantes";
import ProtectedRoute from "./ProtectedRoute";
import Docentes from "../pages/Docentes";
import Cursos from "../pages/Cursos";
import Matriculas from "../pages/Matriculas";
import PagosDocentes from "../pages/PagosDocentes";

function AppRoutes(){

    return (

        <BrowserRouter>

            <Routes>

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
                    path="/matriculas"
                    element={
                        <ProtectedRoute>
                            <Matriculas/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pagos-docentes"
                    element={
                        <ProtectedRoute>
                            <PagosDocentes/>
                        </ProtectedRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;