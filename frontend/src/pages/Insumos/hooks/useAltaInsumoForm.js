import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { insumoUrl, modeloUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAltaInsumoForm() {
  const [insumo, setInsumo] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [stockMinimo, setStockMinimo] = useState("");
  const [modelos, setModelos] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(modeloUrl)
      .then((res) => {
        const habilitados = res.data.filter((r) => r.flagHabilitado);
        setModelos(habilitados);
      })
      .catch(() => setModelos([]));
  }, []);

  const validarCampos = () => {
    return modeloSeleccionado?.id && insumo.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      addToast("❌ Debe completar todos los campos", "danger");
      return;
    }

    const minimo = stockMinimo === "" ? 5 : Number(stockMinimo);

    try {
      await axios.post(`${insumoUrl}/modelo/${modeloSeleccionado.id}/insumos`, {
        insumos: [insumo.trim().toUpperCase()],
        stock_minimo: minimo,
      });

      addToast("✅ Insumo asociado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al asociar insumo";
      addToast(msg, "danger");
    }
  };

  const handleCancelar = () => {
    setInsumo("");
    setModeloSeleccionado(null);
    navigate("/");
  };

  return {
    insumo,
    setInsumo,
    modelos,
    modeloSeleccionado,
    stockMinimo,
    setStockMinimo,
    setModeloSeleccionado,
    handleSubmit,
    handleCancelar,
  };
}
