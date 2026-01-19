import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RoleGuard({ allowedRoles }) {
  const { auth } = useAuth();

  // Si el rol del usuario no está en la lista de permitidos, al inicio
  if (!allowedRoles.includes(auth.idRol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}