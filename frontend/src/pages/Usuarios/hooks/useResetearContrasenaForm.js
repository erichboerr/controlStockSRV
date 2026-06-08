import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { usuariosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useResetearContrasenaForm() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nuevaPassword, setNuevaPassword] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(usuariosUrl)
      .then((res) => setUsuarios(res.data))
      .catch((error) => {
        console.error("Error al cargar usuarios:", error.message);
        setUsuarios([]);
      });
  }, []);

  const handleUsuarioSelect = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNuevaPassword("");
  };

  const handleCancelar = () => {
    setUsuarioSeleccionado(null);
    setNuevaPassword("");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSeleccionado?.id || !nuevaPassword.trim()) {
      addToast("❌ Faltan datos", "danger");
      return;
    }

    try {
      await axios.put(`${usuariosUrl}/${usuarioSeleccionado.id}`, {
        password: nuevaPassword.trim(),
      });

      handleCancelar();
      addToast("✅ Contraseña actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar contraseña:", error.message);        
      addToast("❌ Error al actualizar", "danger");
    }
  };

  return {
    usuarios,
    usuarioSeleccionado,
    nuevaPassword,
    setNuevaPassword,
    handleUsuarioSelect,
    handleCancelar,
    handleSubmit,
  };
}