import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { serviciosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEditarServicioForm() {
  const [servicios, setServicios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [servicio, setServicio] = useState("");
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


  return {
    servicios,
    seleccionado,
    setSeleccionado,
    servicio,
    setServicio,
    editarServicio,
    handleCancelar,    
  };
}