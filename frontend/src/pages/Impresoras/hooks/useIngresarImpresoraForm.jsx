import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import {
  marcaUrl,
  modeloUrl,
  impresoraUrl,
  impresoraFisicaUrl,
  proveedoresUrl,
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useIngresarImpresoraForm() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [proveedor, setProveedor] = useState(null);

  const [series, setSeries] = useState([""]);
  const [remito, setRemito] = useState("");

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarProveedores();
    cargarMarcas();
  }, []);

  useEffect(() => {
    const actualizarModelos = async () => {
      if (marca?.id) {
        await cargarModelosPorMarca(marca.id);
        setModelo(null);
        //console.log("Marca seleccionada:", marca);
        //console.log("Modelos cargados:", modelos);
      } else {
        setModelos([]);
        setModelo(null);
      }
    };

    actualizarModelos();
  }, [marca?.id]);

  const cargarMarcas = async () => {
    try {
      const actualizada = await axios.get(marcaUrl);
      //console.log("Respuesta marcas:", actualizada.data);
      const raw = Array.isArray(actualizada.data)
        ? actualizada.data
        : actualizada.data.marca;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setMarcas(habilitados);
      //console.log("Marcas seteadas:", habilitados);
      return habilitados;
    } catch {
      setMarcas([]);
      return [];
    }
  };

  const cargarModelosPorMarca = async (id) => {
    try {
      const res = await axios.get(`${modeloUrl}/porMarca?idMarca=${id}`);
      const raw = Array.isArray(res.data) ? res.data : res.data.modelo;
      const habilitados = raw.filter((m) => m.flagHabilitado);
      setModelos(habilitados);
      return habilitados;
    } catch {
      setModelos([]);
      return [];
    }
  };

  const cargarProveedores = async () => {
    try {
      const res = await axios.get(proveedoresUrl);
      const raw = Array.isArray(res.data) ? res.data : res.data.proveedor;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setProveedores(habilitados);
    } catch {
      setProveedores([]);
    }
  };

  // --- Manejo del array de series ---
  const agregarSerie = () => {
    setSeries((prev) => [...prev, ""]);
  };

  const quitarSerie = (index) => {
    setSeries((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );
  };

  const actualizarSerie = (index, value) => {
    setSeries((prev) =>
      prev.map((s, i) => (i === index ? value.toUpperCase() : s))
    );
  };

  const IngresarImpresora = async () => {
    const seriesLimpias = series.map((s) => s.trim()).filter(Boolean);
    const seriesUnicas = new Set(seriesLimpias);

    if (!marca?.id || !modelo?.id || !proveedor?.id || seriesLimpias.length === 0) {
      addToast(
        "❌ Todos los campos obligatorios deben estar completos",
        "danger"
      );
      return;
    }

    if (seriesUnicas.size !== seriesLimpias.length) {
      addToast("❌ Hay números de serie repetidos en la carga", "danger");
      return;
    }

    try {
      // Paso 1: buscar o crear la impresora (marca+modelo)
      const buscarRes = await axios.get(
        `${impresoraUrl}?marcaId=${marca.id}&modeloId=${modelo.id}`
      );
      let impresoraId = null;

      if (Array.isArray(buscarRes.data) && buscarRes.data.length > 0) {
        impresoraId = buscarRes.data[0].id;
      } else {
        const crearRes = await axios.post(impresoraUrl, {
          marcaId: marca.id,
          modeloId: modelo.id,
        });
        impresoraId = crearRes.data.id;
      }

      // Paso 2: alta masiva de impresoras físicas para ese modelo
      const res = await axios.post(`${impresoraFisicaUrl}/bulk`, {
        proveedorId: proveedor.id,
        remito: remito.trim() || null,
        impresoraId,
        numerosSerie: seriesLimpias,
      });

      addToast(
        `✅ ${res.data.cantidad} impresora(s) ingresada(s) correctamente`,
        "success"
      );

      // Reseteamos marca/modelo/series para permitir cargar otro modelo
      // del mismo remito sin tener que volver a tipear proveedor/remito
      setMarca(null);
      setModelo(null);
      setSeries([""]);
    } catch (error) {
      console.error("Error al ingresar impresoras:", error);
      const mensaje =
        error?.response?.data?.error || "Error al guardar las impresoras";
      addToast(`❌ ${mensaje}`, "danger");
    }
  };

  const handleCancelar = () => {
    setMarca(null);
    setModelo(null);
    setProveedor(null);
    setSeries([""]);
    setRemito("");
    navigate("/");
  };

  return {
    marca,
    modelo,
    proveedor,
    series,
    remito,
    marcas,
    modelos,
    proveedores,
    setMarca,
    setModelo,
    setProveedor,
    agregarSerie,
    quitarSerie,
    actualizarSerie,
    setRemito,
    handleCancelar,
    IngresarImpresora,
  };
}
