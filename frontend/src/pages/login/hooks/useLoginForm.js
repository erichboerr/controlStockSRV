import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFormData } from "../helpers/validateFormData";
import { loginUser } from "../services/loginService";
import { guardarToken } from "../../../common/utils/auth";
import useAuth from "../../../common/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../../common/hooks/useToast.js";

export function useLoginForm() {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { addToast } = useToast(); // feedback global

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validateFormData(formData);

    if (errores.length > 0) {
      addToast(errores.join("\n"), "warning");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(formData);

      if (data.success && data.token) {
        guardarToken(data.token);

        const { rolId, usuario } = jwtDecode(data.token);
        setAuth({
          isLoggedIn: true,
          idRol: rolId,
          user: { usuario },
        });

        addToast("✅ Inicio de sesión exitoso", "success");

        setTimeout(() => navigate("/"), 1500);
      } else {
        addToast(data.message || "Credenciales inválidas", "error");
      }
    } catch (err) {
      addToast(err?.message || "❌ Error en el inicio de sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
  };
}
