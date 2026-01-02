import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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

  const [serie, setSerie] = useState("");
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

  const IngresarImpresora = async () => {
    if (!marca?.id || !modelo?.id || !proveedor?.id || !serie.trim()) {
      addToast(
        "❌ Todos los campos obligatorios deben estar completos",
        "danger"
      );
      return;
    }

    try {
      const buscarRes = await axios.get(
        `${impresoraUrl}?marcaId=${marca.id}&modeloId=${modelo.id}`
      );
      //console.log("Respuesta buscar impresora:", buscarRes.data);
      let impresoraId = null;

      if (Array.isArray(buscarRes.data) && buscarRes.data.length > 0) {
        impresoraId = buscarRes.data[0].id;
        //console.log("ID de la Impresora encontrada:", impresoraId);
      } else {
        // Paso 2: crear si no existe
        const crearRes = await axios.post(impresoraUrl, {
          marcaId: marca.id,
          modeloId: modelo.id,
        });
        impresoraId = crearRes.data.id;
      }

      // Paso 3: crear impresora física
      await axios.post(impresoraFisicaUrl, {
        numeroSerie: serie.trim(),
        remito: remito.trim() || null,
        proveedorId: proveedor.id,
        impresoraId: impresoraId,
      });

      addToast("✅ Impresora ingresada correctamente", "success");
      handleCancelar();
    } catch (error) {
      console.error("Error al ingresar impresora:", error);
      addToast("❌ Error al guardar impresora", "danger");
    }
  };

  const handleCancelar = () => {
    setMarca(null);
    setModelo(null);
    setProveedor(null);
    setSerie("");
    setRemito("");
    navigate("/");
  };

  return {
    marca,
    modelo,
    proveedor,
    serie,
    remito,
    marcas,
    modelos,
    proveedores,
    setMarca,
    setModelo,
    setProveedor,
    setSerie,
    setRemito,
    handleCancelar,
    IngresarImpresora,
  };
}
