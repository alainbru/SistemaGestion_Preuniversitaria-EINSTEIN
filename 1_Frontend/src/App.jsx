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
import Matriculas from "./pages/Matriculas";
import PagosDocentes from "./pages/PagosDocentes";
import PagosEstudiantes from "./pages/PagosEstudiantes";
import Asistencias from "./pages/Asistencias";
import HistorialPagos from "./pages/HistorialPagos";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/estudiantes"
          element={
            <ProtectedRoute>
              <Estudiantes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/docentes"
          element={
            <ProtectedRoute>
              <Docentes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cursos"
          element={
            <ProtectedRoute>
              <Cursos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matriculas"
          element={
            <ProtectedRoute>
              <Matriculas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pagos-docentes"
          element={
            <ProtectedRoute>
              <PagosDocentes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pagos-estudiantes"
          element={
            <ProtectedRoute>
              <PagosEstudiantes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/historial-pagos"
          element={
            <ProtectedRoute>
              <HistorialPagos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/asistencia"
          element={
            <ProtectedRoute>
              <Asistencias />
            </ProtectedRoute>
          }
        />

  
        

        {/* Ruta por defecto/fallback para URLs desconocidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;