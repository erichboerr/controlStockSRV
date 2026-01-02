import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";
import { getToken } from "../utils/auth";

export default function useSession() {
  const { setAuth } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    try {
      const payload = jwtDecode(token);
      //console.log("Payload decodificado:", payload);

      setAuth({
        isLoggedIn: true,
        idRol: payload.rolId,             
        user: { nombre: payload.usuario }, 
      });
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }, [setAuth]);
}