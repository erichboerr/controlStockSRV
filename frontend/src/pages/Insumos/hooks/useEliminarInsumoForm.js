import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { insumoUrl, modeloUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEliminarInsumoForm() {
  const [modelos, setModelos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate(); 

  const confirmarEliminacion = () => setShowConfirm(true);
  const cancelarConfirmacion = () => setShowConfirm(false);

  // Cargar modelos
  useEffect(() => {
    axios
      .get(modeloUrl)
      .then((res) => {
        const habilitados = res.data.filter((r) => r.flagHabilitado);
        setModelos(habilitados);
      })
      .catch(() => setModelos([]));
  }, []);

  // Cargar insumos asociados al modelo
  useEffect(() => {
    if (modeloSeleccionado) {
      axios
        .get(`${insumoUrl}/modelo/?modeloId=${modeloSeleccionado.id}`)
        .then((res) => {
          const habilitados = res.data.filter((r) => r.flagHabilitado);
          setInsumos(habilitados);
        })
        .catch(() => setInsumos([]));
    } else {
      setInsumos([]);
    }
  }, [modeloSeleccionado]);

  const validarCampos = () => {
    return modeloSeleccionado?.id && insumoSeleccionado?.id;
  };

  const handleEliminar = async () => {
    if (!validarCampos()) {
      addToast("❌ Debe completar todos los campos", "danger");
      return;
    }

    try {
      await axios.delete(
        `${insumoUrl}/modelo/${modeloSeleccionado.id}/${insumoSeleccionado.id}`
      );

      addToast("✅ Insumo desasociado del modelo", "success");
      handleCancelar();
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al eliminar";
      addToast(msg, "danger");
    }

    cancelarConfirmacion();
  };

  const handleCancelar = () => {
    setModeloSeleccionado(null);
    setInsumoSeleccionado(null);
    navigate("/");
  };

  return {
    modelos,
    insumos,
    modeloSeleccionado,
    setModeloSeleccionado,
    insumoSeleccionado,
    setInsumoSeleccionado,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    handleEliminar,
    handleCancelar,
  };
}