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
import PagosEstudiantes from "../pages/PagosEstudiantes";
import Asistencias from "../pages/Asistencias";
import LogPagos from "../pages/LogPagos";
import HistorialPagos from "../pages/HistorialPagos";

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

                <Route
                    path="/pagos-estudiantes"
                    element={
                        <ProtectedRoute>
                            <PagosEstudiantes/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/asistencia"
                    element={
                        <ProtectedRoute>
                            <Asistencias/>
                        </ProtectedRoute>
                    }
                />

         

               <Route
                    path="/historial-pagos"
                    element={
                        <ProtectedRoute>
                            <HistorialPagos/>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;