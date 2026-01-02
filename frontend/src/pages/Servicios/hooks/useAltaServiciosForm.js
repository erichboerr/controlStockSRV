import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serviciosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAltaServiciosForm() {
  const [servicios] = useState([]);
  const [servicio, setServicio] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleCancelar = () => {
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
      handleCancelar();
    } catch (error) {
      const msg =
        error?.response?.data?.error || "❌ Error al agregar servicio";
      addToast(msg, "danger");
    }
  };

  return {
    servicio,
    setServicio,
    handleCancelar,
    agregarServicio,
  };
}
