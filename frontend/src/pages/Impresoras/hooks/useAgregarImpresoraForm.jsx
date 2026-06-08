import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import {
  marcaUrl,
  modeloUrl,
  insumoUrl,
  impresoraUrl,
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAgregarImpresoraForm() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [insumos, setInsumos] = useState([""]);
  const [modeloExiste, setModeloExiste] = useState(false);
  const [showModalMarca, setShowModalMarca] = useState(false);
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
    } catch {
      setMarcas([]);
      return [];
    }
  };

  const cargarModelosPorMarca = async (id) => {
    try {
      const res = await axios.get(`${modeloUrl}?idMarca=${id}`);
      const raw = Array.isArray(res.data) ? res.data : res.data.modelo;
      const habilitados = raw.filter((m) => m.flagHabilitado);
      setModelos(habilitados);
      return habilitados;
    } catch {
      setModelos([]);
      return [];
    }
  };

  const handleMarcaChange = async (seleccionada) => {
    setMarca(seleccionada);
    setModelo(null);
    setModeloExiste(false);
    setInsumos([""]);
    if (seleccionada?.id) {
      await cargarModelosPorMarca(seleccionada.id);
    }
  };

  const agregarMarca = async (nuevoValor) => {
    const normalizado = nuevoValor.trim().toUpperCase();
    try {
      const yaExiste = marcas.some(
        (m) => m.marca.trim().toUpperCase() === normalizado
      );
      if (yaExiste) {
        addToast("⚠️ La marca ya existe", "warning");
        setShowModalMarca(false);
        return;
      }
      await axios.post(marcaUrl, { marca: normalizado });
      const habilitados = await cargarMarcas();
      const nueva = habilitados.find((m) => m.marca === normalizado);
      setMarca(nueva);
      setShowModalMarca(false);
    } catch {
      addToast("❌ Error al agregar marca", "danger");
      setShowModalMarca(false);
    }
  };

  const handleModeloChange = (texto) => {
    const normalizado = texto.trim().toUpperCase();
    const existenteObj = modelos.find((m) => m.modelo === normalizado);
    if (existenteObj) {
      setModelo(existenteObj);
      setModeloExiste(true);
    } else {
      setModelo({ modelo: normalizado });
      setModeloExiste(false);
    }
  };

  async function AgregarInsumos(modeloId) {
    // Filtrar vacíos
    const insumosValidos = insumos
      .map((i) => i.trim().toUpperCase())
      .filter((i) => i.length > 0);

    if (insumosValidos.length === 0) {
      return;
    }

    //console.log("Guardando insumos:", insumosValidos);

    await axios.post(`${insumoUrl}/modelo/${modeloId}/insumos`, {
      insumos: insumosValidos,
      stock_minimo: 5, // valor por defecto
    });
  }

  const agregarImpresoraObjeto = async () => {
    if (!marca?.id || !modelo?.modelo) {
      addToast("❌ Marca y modelo son obligatorios", "danger");
      return false;
    }

    const normalizado = modelo.modelo.trim().toUpperCase();

    // 1) Validar modelo existente
    const actualizados = await cargarModelosPorMarca(marca.id);
    const yaExiste = actualizados.some((m) => m.modelo === normalizado);

    if (yaExiste) {
      addToast("⚠️ El modelo ya existe para esta marca", "warning");
      setModeloExiste(true);
      const existenteObj = actualizados.find((m) => m.modelo === normalizado);
      if (existenteObj) setModelo(existenteObj);
      return false;
    }

    // 2) Crear modelo
    let modeloCreado;
    try {
      const res = await axios.post(modeloUrl, {
        modelo: normalizado,
        marcaId: marca.id,
      });
      modeloCreado = Array.isArray(res.data) ? res.data[0] : res.data;
      setModelo(modeloCreado);
      await cargarModelosPorMarca(marca.id);
    } catch (error) {
      addToast("❌ Error al crear modelo", "danger");
      console.error("Error al crear modelo:", error);
      return false;
    }

    // ✅ 3) Asociar insumos al modelo (N‑N)
    await AgregarInsumos(modeloCreado.id);

    // 4) Crear impresora
    try {
      await axios.post(impresoraUrl, {
        marcaId: marca.id,
        modeloId: modeloCreado.id,
      });
      addToast("✅ Impresora creada correctamente", "success");
      return true;
    } catch {
      addToast("❌ Error al guardar impresora", "danger");
      return false;
    } finally {
      handleCancelar();
    }
  };

  const handleCancelar = () => {
    setMarca(null);
    setModelo(null);
    setInsumos([""]);
    setShowModalMarca(false);
    navigate("/");
  };

  return {
    marca,
    modelo,
    insumos,
    marcas,
    setMarca,
    setInsumos,
    handleMarcaChange,
    handleModeloChange,
    handleCancelar,
    agregarImpresoraObjeto,
    showModalMarca,
    setShowModalMarca,
    agregarMarca,
    modeloExiste,
  };
}
