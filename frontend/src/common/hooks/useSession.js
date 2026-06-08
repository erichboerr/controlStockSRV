// useSession.js
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";
import { getToken, eliminarToken } from "../utils/auth";

export default function useSession() {
  const { setAuth, setLoading } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const payload = jwtDecode(token);
      const ahora = Date.now() / 1000;
      if (payload.exp < ahora) {
        eliminarToken();
        setAuth({ isLoggedIn: false, idRol: null, user: null });
      } else {
        setAuth({
          isLoggedIn: true,
          idRol: payload.rolId,
          user: { usuario: payload.usuario },
        });
      }
    } catch (err) {
      eliminarToken();
      setAuth({ isLoggedIn: false, idRol: null, user: null });
    } finally {
      setLoading(false);
    }
  }, [setAuth, setLoading]);
}