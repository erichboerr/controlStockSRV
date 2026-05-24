
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { marcaUrl, modeloUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAgregarModeloForm() {
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarMarcas();
  }, []);

  const cargarMarcas = async () => {
    try {
      const res = await axios.get(marcaUrl);
      const raw = Array.isArray(res.data) ? res.data : res.data.marca;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setMarcas(habilitados);
      return habilitados;
    } catch (error) {
      console.error("Error al cargar marcas:", error.message);
      setMarcas([]);
      return [];
    }
  };

  const agregarModelo = async () => {
    if (!marcaSeleccionada?.id || !nuevoNombre.trim()) {
      addToast("❌ Todos los campos obligatorios deben estar completos", "danger");
      return;
    }

    try {
      await axios.post(modeloUrl, {
        modelo: nuevoNombre.trim().toUpperCase(),
        marcaId: marcaSeleccionada.id,
      });

      addToast("✅ Modelo agregado con éxito", "success");
      await cargarMarcas();
      handleCancelar();
    } catch (error) {
      if (error.response?.status === 400) {
        addToast(error.response?.data?.error || "❌ Datos inválidos o faltantes", "danger");
      } else if (error.response?.status === 409) {
        addToast(error.response?.data?.error || "❌ Ya existe un modelo con ese nombre", "danger");
      } else {
        addToast(error.response?.data?.error || "❌ Error al guardar modelo", "danger");
      }
    }
  };

  const handleCancelar = () => {
    setMarcaSeleccionada(null);
    setNuevoNombre("");
    navigate("/");
  };

  return {
    marcaSeleccionada,
    setMarcaSeleccionada,
    nuevoNombre,
    setNuevoNombre,
    marcas,
    setMarcas,
    handleCancelar,
    agregarModelo,
  };
}