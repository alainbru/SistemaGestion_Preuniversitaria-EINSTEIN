import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");

  // Permite el paso si existe el token O si existe el objeto usuario
  if (!token && !usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;