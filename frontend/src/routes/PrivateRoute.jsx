import { Navigate } from "react-router-dom";
import useAuth from "../common/hooks/useAuth"; // Ajusta la ruta a tu hook

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();
  const token = sessionStorage.getItem("token");

  // Si no hay token O el estado global dice que no está logueado, redirigir
  if (!token || !auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}