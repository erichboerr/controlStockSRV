import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { marcaUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAgregarMarcasForm() {
  const [marca, setMarca] = useState("");
  const [marcas, setMarcas] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validarCampos = () => marca.trim().length > 0;

  const agregarMarca = async () => {
    if (!validarCampos()) {
      addToast("❌ Debe completar el campo marca", "danger");
      return;
    }

    const normalizado = marca.trim().toUpperCase();

    try {
      const yaExiste = marcas.some(
        (m) => m.marca.trim().toUpperCase() === normalizado
      );
      if (yaExiste) {
        addToast("⚠️ La marca ya existe", "warning");
        return;
      }

      await axios.post(marcaUrl, { marca: normalizado });
      addToast("✅ Marca creada con éxito", "success");

      setMarca("");
      setMarcas([]); // refrescar lista en el componente padre
    } catch (error) {
      const msg = error.response?.data?.error || "❌ Error al agregar marca";
      addToast(msg, "danger");
    }
  };

  const handleCancelar = () => {
    setMarca("");
    navigate("/");
  };

  return {
    marca,
    setMarca,
    marcas,
    setMarcas,
    agregarMarca,
    handleCancelar,
  };
}
