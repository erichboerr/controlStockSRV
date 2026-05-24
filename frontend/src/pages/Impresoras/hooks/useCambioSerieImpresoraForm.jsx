import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import {
  serviciosUrl,
  impresorasServicioUrl,
  impresoraFisicaUrl, // Asegúrate de tener esta URL o usa una genérica para el update
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useCambioSerieImpresoraForm() {
  // --- Estados de Datos ---
  const [servicios, setServicios] = useState([]);
  const [rawImpresoras, setRawImpresoras] = useState([]); // Guardamos la data cruda del backend

  // --- Estados para los Selects ---
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [series, setSeries] = useState([]);

  // --- Estados de Selección ---
  const [servicio, setServicio] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [serie, setSerie] = useState(null); // Aquí guardaremos la ImpresoraFisica seleccionada

  // --- Input Manual ---
  const [newSerie, setNewSerie] = useState("");

  const { addToast } = useToast();
  const navigate = useNavigate();

  // 1️⃣ Cargar servicios al montar
  useEffect(() => {
    cargarServicios();
  }, []);

  // 2️⃣ Al seleccionar SERVICIO: Cargar impresoras y procesar Marcas únicas
  useEffect(() => {
    if (servicio?.id) {
      cargarImpresorasDelServicio(servicio.id);
    } else {
      resetFormularioCompleto();
    }
  }, [servicio]);

  // 3️⃣ Al seleccionar MARCA: Filtrar Modelos
  useEffect(() => {
    if (marca?.id && rawImpresoras.length > 0) {
      // Filtramos las impresoras que sean de esta marca
      const filtradasPorMarca = rawImpresoras.filter(
        (item) => item.impresoraFisica.impresora.marca.id === marca.id
      );

      // Extraemos modelos únicos
      const modelosUnicos = [];
      const map = new Map();

      filtradasPorMarca.forEach((item) => {
        const mod = item.impresoraFisica.impresora.modelo;
        if (!map.has(mod.id)) {
          map.set(mod.id, true);
          modelosUnicos.push(mod);
        }
      });

      setModelos(modelosUnicos);
      setModelo(null); // Reset siguientes
      setSerie(null);
      setSeries([]);
    }
  }, [marca, rawImpresoras]);

  // 4️⃣ Al seleccionar MODELO: Filtrar Series (Impresoras Físicas)
  useEffect(() => {
    if (modelo?.id && marca?.id && rawImpresoras.length > 0) {
      // Filtramos por marca Y modelo
      const filtradas = rawImpresoras.filter(
        (item) =>
          item.impresoraFisica.impresora.marca.id === marca.id &&
          item.impresoraFisica.impresora.modelo.id === modelo.id
      );

      // Mapeamos para el SelectGeneric (necesita id y numeroSerie)
      // OJO: Usamos el ID de la impresora física, no del servicio
      const seriesDisponibles = filtradas.map((item) => ({
        id: item.impresoraFisica.id,
        numeroSerie: item.impresoraFisica.numeroSerie,
      }));

      setSeries(seriesDisponibles);
      setSerie(null); // Reset siguiente
    }
  }, [modelo, rawImpresoras]);

  // --- Funciones de Carga ---

  const cargarServicios = async () => {
    try {
      const res = await axios.get(serviciosUrl);
      setServicios(res.data || []);
    } catch {
      setServicios([]);
      addToast("Error al cargar servicios", "danger");
    }
  };

  const cargarImpresorasDelServicio = async (idServicio) => {
    try {
      // Corregimos la sintaxis de la URL
      const url = `${impresorasServicioUrl}/servicio/${idServicio}`;
      const res = await axios.get(url);
      console.log(res.data);

      const data = res.data || [];
      setRawImpresoras(data);

      // --- Procesar Marcas Únicas (Nivel 1 de cascada) ---
      const marcasUnicas = [];
      const map = new Map();

      data.forEach((item) => {
        // Navegamos por la estructura que definimos en el Controller
        const m = item.impresoraFisica?.impresora?.marca;
        if (m && !map.has(m.id)) {
          map.set(m.id, true);
          marcasUnicas.push(m);
        }
      });

      setMarcas(marcasUnicas);

      // Reset de selecciones inferiores
      setMarca(null);
      setModelo(null);
      setSerie(null);
      setNewSerie("");
    } catch (error) {
      console.error("Error cargando impresoras:", error);
      setRawImpresoras([]);
      setMarcas([]);
      // Si es 404 es que no hay impresoras, no es un error crítico
      if (error.response?.status !== 404) {
        addToast("Error al cargar impresoras del servicio", "danger");
      }
    }
  };

  // --- Función de Guardado (Update) ---
  const cambioSerie = async () => {
    if (!serie?.id || !newSerie.trim()) {
      addToast("Faltan datos por completar", "warning");
      return;
    }

    try {
      // En el Hook
      await axios.put(`${impresoraFisicaUrl}/${serie.id}`, {
        // enviamos el ID en la URL
        nuevoNumeroSerie: newSerie.trim(), // enviamos este nombre para el body
      });

      addToast("✅ Número de serie actualizado correctamente", "success");

      // Limpieza y recarga
      handleCancelar();
    } catch (error) {
      console.error("Error updating serie:", error);
      const msg =
        error.response?.data?.message || "Error al actualizar la serie";
      addToast(`❌ ${msg}`, "danger");
    }
  };

  const resetFormularioCompleto = () => {
    setRawImpresoras([]);
    setMarcas([]);
    setModelos([]);
    setSeries([]);
    setMarca(null);
    setModelo(null);
    setSerie(null);
    setNewSerie("");
  };

  const handleCancelar = () => {
    setServicio(null);
    resetFormularioCompleto();
    navigate("/");
  };

  return {
    servicio,
    marca,
    modelo,
    serie,
    newSerie,
    servicios,
    marcas,
    modelos,
    series,
    setServicio,
    setMarca,
    setModelo,
    setSerie,
    setNewSerie,
    handleCancelar,
    cambioSerie,
  };
}
