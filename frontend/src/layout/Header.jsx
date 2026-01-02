// src/layout/Header.jsx
import Button from "../common/components/Button";

import useAuth from "../common/hooks/useAuth";
import { eliminarToken } from "../common/utils/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    eliminarToken();
    setAuth({
      isLoggedIn: false,
      idRol: null,
      user: null,
    });
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Izquierda: Logo o título */}
      <h1 className="text-xl font-semibold text-gray-700">Control de Stock</h1>

      {/* Derecha: Usuario + Logout */}
      <div className="flex items-center gap-4">

        {/* Usuario logueado */}
        <div className="flex items-center gap-2 text-gray-700">
          <i className="bi bi-person-circle text-xl"></i>
          <span className="font-medium">
            {auth?.user?.usuario || "Usuario"}
          </span>
        </div>

        {/* Botón Logout */}
        <button
          onClick={handleLogout}
          className="
            bg-red-600 hover:bg-red-700 
            text-white px-3 py-1.5 rounded-lg 
            flex items-center gap-2 transition
          "
        >
          <i className="bi bi-box-arrow-right"></i>
          Salir
        </button>
      </div>
    </header>
  );
}