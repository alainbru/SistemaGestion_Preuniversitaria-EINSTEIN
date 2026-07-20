import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute"; // 1. Importas tu ruta protegida

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: Muestra el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Alias opcional para /login para coincidir con la redirección */}
        <Route path="/login" element={<Login />} />

        {/* Ruta Protegida */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Cualquier otra ruta no existente redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;