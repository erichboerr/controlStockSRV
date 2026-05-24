import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { serviciosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useServiciosCrud() {
  const [servicios, setServicios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [servicio, setServicio] = useState("");
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

  const handleSelect = (s) => {
    setSeleccionado(s);
    setServicio("");
  };

  const handleCancelar = () => {
    setSeleccionado(null);
    setServicio("");
    navigate("/");
  };

  const existeServicio = (servicioNormalizado, excluirId = null) => {
    return servicios.some(
      (s) =>
        s.servicio.trim().toUpperCase() === servicioNormalizado &&
        s.id !== excluirId
    );
  };

  const agregarServicio = async () => {
    const servicioNormalizado = servicio.trim().toUpperCase();
    if (!servicioNormalizado) {
      addToast("❌ El servicio no puede estar vacío", "danger");
      return;
    }

    if (existeServicio(servicioNormalizado)) {
      addToast("⚠️ Ya existe un servicio con ese nombre", "warning");
      return;
    }

    try {
      await axios.post(serviciosUrl, { servicio: servicioNormalizado });
      addToast("✅ Servicio agregado correctamente", "success");
      setServicio("");
      await cargarServicios();
    } catch (error) {
      const msg =
        error?.response?.data?.error || "❌ Error al agregar servicio";
      addToast(msg, "danger");
    }
  };

  const editarServicio = async () => {
    const servicioNormalizado = servicio.trim().toUpperCase();
    if (!servicioNormalizado || !seleccionado?.id) {
      addToast("❌ Faltan datos", "danger");
      return;
    }

    if (existeServicio(servicioNormalizado, seleccionado.id)) {
      addToast("⚠️ Ya existe un servicio con ese nombre", "warning");
      return;
    }

    try {
      await axios.put(`${serviciosUrl}/${seleccionado.id}`, {
        servicio: servicioNormalizado,
      });
      addToast("✅ Servicio actualizado", "success");
      await cargarServicios();
      handleCancelar();
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al actualizar";
      addToast(msg, "danger");
    }
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
      cancelarConfirmacion(); // asegura cerrar el modal
      setDeleting(false);
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
    servicio,
    setServicio,
    setSeleccionado,
    handleSelect,
    handleCancelar,
    agregarServicio,
    editarServicio,
    eliminarServicio,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    handleEliminar,
    deleting,
  };
}
