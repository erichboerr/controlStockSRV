import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { modeloUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEditarModeloForm() {
  const [modelos, setModelos] = useState([]);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate(); 

  useEffect(() => {
    cargarModelos();
  }, []);

  const cargarModelos = async () => {
    try {
      const res = await axios.get(modeloUrl);
      const raw = Array.isArray(res.data) ? res.data : res.data.modelo;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setModelos(habilitados);
      return habilitados;
    } catch (error) {
      console.error("Error al cargar modelos:", error.message);
      setModelos([]);
      return [];
    }
  };

  const editarModelo = async () => {
    if (!modeloSeleccionado?.id || !nuevoNombre.trim()) {
      addToast("❌ Todos los campos obligatorios deben estar completos", "danger");
      return;
    }

    try {
      await axios.put(`${modeloUrl}/${modeloSeleccionado.id}`, {
        modelo: nuevoNombre.trim().toUpperCase(),
      });

      addToast("✅ Modelo actualizado con éxito", "success");
      await cargarModelos();
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
    setModeloSeleccionado(null);
    setNuevoNombre("");
    navigate("/");
  };

  return {
    modeloSeleccionado,
    setModeloSeleccionado,
    nuevoNombre,
    setNuevoNombre,
    modelos,
    setModelos,
    handleCancelar,
    editarModelo,
  };
}