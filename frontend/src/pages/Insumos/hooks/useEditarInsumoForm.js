import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { insumoUrl, modeloUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEditarInsumoForm() {
  const [insumo, setInsumo] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Cargar modelos
  useEffect(() => {
    axios
      .get(modeloUrl)
      .then((res) => {
        const habilitados = res.data.filter((r) => r.flagHabilitado);
        setModelos(habilitados);
      })
      .catch(() => {
        setModelos([]);
       addToast("❌ Error al cargar modelos", "danger");
      });
  }, [addToast]);

  // Cargar insumos asociados al modelo
  useEffect(() => {
    if (modeloSeleccionado) {
      axios
        .get(`${insumoUrl}/modelo/?modeloId=${modeloSeleccionado.id}`)
        .then((res) => {
          const habilitados = res.data.filter((r) => r.flagHabilitado);
          setInsumos(habilitados);
          setInsumoSeleccionado(null);
          setInsumo("");
        })
        .catch(() => {
          setInsumos([]);
          addToast("❌ Error al cargar insumos", "danger");
        });
    } else {
      setInsumos([]);
      setInsumoSeleccionado(null);
      setInsumo("");
    }
  }, [modeloSeleccionado, addToast]);

  const validarCampos = () => {
    return insumoSeleccionado?.id && insumo.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      addToast("❌ Debe completar todos los campos", "danger");
      return;
    }

    try {
      await axios.put(`${insumoUrl}/${insumoSeleccionado.id}`, {
        insumo: insumo.trim().toUpperCase(),
      });

      addToast("✅ Insumo actualizado", "success");
      handleCancelar();
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al actualizar";
      addToast(msg, "danger");
    }
  };

  const handleCancelar = () => {
    setInsumo("");
    setModeloSeleccionado(null);
    setInsumoSeleccionado(null);
    navigate("/");
  };

  return {
    insumo,
    setInsumo,
    modelos,
    insumos,
    modeloSeleccionado,
    setModeloSeleccionado,
    insumoSeleccionado,
    setInsumoSeleccionado,
    handleSubmit,
    handleCancelar,
  };
}
