import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { repuestosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAltaInsumoForm() {
  const [repuesto, setRepuesto] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validarCampos = () => {
    return repuesto.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      addToast("❌ Debe completar todos los campos", "danger");
      return;
    }

    const minimo = stockMinimo === "" ? 3 : Number(stockMinimo);

    try {
      await axios.post(`${repuestosUrl}/nuevo`, {
        repuesto: repuesto.trim().toUpperCase(),
        stock_minimo: minimo,
      });

      addToast("✅ Repuesto asociado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const msg =
        error?.response?.data?.error || "❌ Error al asociar repuesto";
      addToast(msg, "danger");
    }
  };

  const handleCancelar = () => {
    setRepuesto("");
    navigate("/");
  };

  return {
    repuesto,
    setRepuesto,
    stockMinimo,
    setStockMinimo,
    handleSubmit,
    handleCancelar,
  };
}
