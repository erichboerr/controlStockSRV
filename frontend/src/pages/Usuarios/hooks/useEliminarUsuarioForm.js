import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { usuariosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEliminarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [tipo, _] = useState("usuario");
  const campo = "user";
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(usuariosUrl)
      .then((res) => {
        const habilitados = res.data.filter((u) => u.flagHabilitado);
        setUsuarios(habilitados);
      })
      .catch((error) => {
        console.error("Error al cargar usuarios:", error.message);
        setUsuarios([]);
      });
  }, []);

  const handleSelect = (usuario) => {
    if (!usuario) return;
    setSeleccionado(usuario);
  };

  const handleCancelar = () => {
    setSeleccionado(null);
    navigate("/");
  };

  const confirmarEliminacion = () => setShowConfirm(true);
  const cancelarConfirmacion = () => setShowConfirm(false);

  const eliminarUsuario = async () => {
    if (!seleccionado?.id) return;

    try {
      await axios.delete(`${usuariosUrl}/${seleccionado.id}`);
      addToast("✅ Usuario eliminado", "success");
      setUsuarios((prev) => prev.filter((u) => u.id !== seleccionado.id));
      handleCancelar();
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      addToast("❌ Error al eliminar", "danger");
    }

    cancelarConfirmacion();
  };

  return {
    usuarios,
    seleccionado,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    eliminarUsuario,
    handleSelect,
    handleCancelar,
    tipo,
    campo,
  };
}
