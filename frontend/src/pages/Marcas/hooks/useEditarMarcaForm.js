import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { marcaUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEditarMarcaForm() {
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  // cargar marcas al montar
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

  const guardarMarca = async () => {
    if (!marcaSeleccionada?.id || !nuevoNombre.trim()) {
      addToast("❌ Todos los campos obligatorios deben estar completos", "danger");
      return;
    }

    try {
      await axios.put(`${marcaUrl}/${marcaSeleccionada.id}`, {
        marca: nuevoNombre.trim().toUpperCase(),
      });

      addToast("✅ Marca actualizada con éxito", "success");
      await cargarMarcas();
      handleCancelar();
    } catch (error) {
      if (error.response?.status === 400) {
        addToast(error.response?.data?.error || "❌ Datos inválidos o faltantes", "danger");
      } else if (error.response?.status === 409) {
        addToast(error.response?.data?.error || "❌ Ya existe una marca con ese nombre", "danger");
      } else {
        addToast(error.response?.data?.error || "❌ Error al guardar marca", "danger");
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
    guardarMarca,
  };
}