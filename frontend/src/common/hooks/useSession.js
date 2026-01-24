import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";
import { getToken, eliminarToken } from "../utils/auth"; // Importamos eliminarToken

export default function useSession() {
  const { setAuth } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    try {
      const payload = jwtDecode(token);
      
      // Validar si el token expiró
      const ahora = Date.now() / 1000; // JWT usa segundos, no milisegundos
      if (payload.exp < ahora) {
        console.warn("La sesión ha expirado");
        eliminarToken();
        setAuth({ isLoggedIn: false, idRol: null, user: null });
        return;
      }

      // Si no ha expirado, cargamos la sesión normalmente
      setAuth({
        isLoggedIn: true,
        idRol: payload.rolId,              
        user: { usuario: payload.usuario }, // Mantenemos consistencia con useLoginForm
      });
    } catch (err) {
      console.error("Token inválido o corrupto:", err);
      eliminarToken();
      setAuth({ isLoggedIn: false, idRol: null, user: null });
    }
  }, [setAuth]);
}