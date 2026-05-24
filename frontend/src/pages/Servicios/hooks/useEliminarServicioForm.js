import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { serviciosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEliminarServicioForm() {
  const [servicios, setServicios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const res = await axios.get(serviciosUrl);
      const rawData = Array.isArray(res.data) ? res.data : res.data.servicios;
      const habilitados = rawData.filter((s) => s.flagHabilitado);
      setServicios(habilitados);
    } catch (error) {
      console.error("Error al cargar servicios:", error.message);
      setServicios([]);
    }
  };

  const handleCancelar = () => {
    setSeleccionado(null);
    setShowConfirm(false);
    setDeleting(false);
    navigate("/");
  };

  const eliminarServicio = async () => {
    if (!seleccionado?.id || deleting) return;
    setDeleting(true);
    try {
      await axios.delete(`${serviciosUrl}/${seleccionado.id}`);
      addToast("✅ Servicio eliminado", "success");
      await cargarServicios();
      handleCancelar();
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al eliminar";
      addToast(msg, "danger");
    } finally {
      cancelarConfirmacion();
    }
  };

  const confirmarEliminacion = () => setShowConfirm(true);
  const cancelarConfirmacion = () => setShowConfirm(false);

  // Igual que en insumos: la función que se pasa al modal
  const handleEliminar = () => {
    cancelarConfirmacion();
    eliminarServicio();
  };

  return {
    servicios,
    seleccionado,
    setSeleccionado,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    handleEliminar,
    handleCancelar,
  };
}
