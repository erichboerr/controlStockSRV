import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { insumoUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useModificarStockMinimo() {
  const [insumos, setInsumos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [nuevoMinimo, setNuevoMinimo] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(insumoUrl)
      .then((res) => setInsumos(res.data))
      .catch(() => setInsumos([]));
  }, []);

  const guardar = async () => {
    if (!seleccionado) {
      addToast("Debe seleccionar un insumo", "danger");
      return;
    }

    const minimo = nuevoMinimo === "" ? 5 : Number(nuevoMinimo);

    try {
      await axios.put(`${insumoUrl}/${seleccionado.id}/stock-minimo`, {
        stock_minimo: minimo,
      });

      addToast("✅ Stock mínimo actualizado", "success");
      handleCancelar();
    } catch (error) {
      addToast("❌ Error al actualizar stock mínimo", "danger");
    }
  };

  const handleCancelar = () => {
    setInsumos([]);
    setSeleccionado(null);
    setNuevoMinimo(null);
    navigate("/");
  };

  return {
    insumos,
    seleccionado,
    setSeleccionado,
    nuevoMinimo,
    setNuevoMinimo,
    guardar,
    handleCancelar,
  };
}
