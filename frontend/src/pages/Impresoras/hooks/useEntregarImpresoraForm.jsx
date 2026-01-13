import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  serviciosUrl,
  impresoraFisicaUrl,
  impresorasServicioUrl,
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEntregarImpresoraForm() {
  const [servicios, setServicios] = useState([]);
  const [impresorasDisponibles, setImpresorasDisponibles] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [series, setSeries] = useState([]);
  const [servicio, setServicio] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [serie, setSerie] = useState(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Cargar servicios al inicio
  useEffect(() => {
    cargarServicios();
  }, []);

  // Al cambiar servicio, cargar impresoras físicas disponibles y resetear cascada
  useEffect(() => {
    if (servicio?.id) {
      cargarImpresorasDisponibles();
      setMarca(null);
      setModelo(null);
      setSerie(null);
    } else {
      setImpresorasDisponibles([]);
      setMarcas([]);
      setModelos([]);
      setSeries([]);
    }
  }, [servicio?.id]);

  // Derivar marcas desde la base
  useEffect(() => {
    const nuevasMarcas = [];
    impresorasDisponibles.forEach((i) => {
      const marcaObj = i?.impresora?.marca;
      if (marcaObj && !nuevasMarcas.find((m) => m.id === marcaObj.id)) {
        nuevasMarcas.push(marcaObj);
      }
    });
    setMarcas(nuevasMarcas);
    //console.log("impresorasDisponibles derivadas:", impresorasDisponibles);

    if (marca && !nuevasMarcas.find((m) => m.id === marca.id)) {
      setMarca(null);
      setModelo(null);
      setSerie(null);
    }
  }, [impresorasDisponibles, marca]);

  // Derivar modelos filtrados por marca
  useEffect(() => {
    if (!marca?.id) {
      setModelos([]);
      setModelo(null);
      setSeries([]);
      setSerie(null);
      return;
    }

    const nuevosModelos = [];
    impresorasDisponibles
      .filter((i) => i?.impresora?.marca?.id === marca.id)
      .forEach((i) => {
        const modeloObj = i?.impresora?.modelo;
        if (modeloObj && !nuevosModelos.find((m) => m.id === modeloObj.id)) {
          nuevosModelos.push(modeloObj);
        }
      });

    setModelos(nuevosModelos);

    if (modelo && !nuevosModelos.find((m) => m.id === modelo.id)) {
      setModelo(null);
      setSerie(null);
    }
  }, [marca, modelo, impresorasDisponibles]);

  // Derivar series filtradas por marca + modelo
  useEffect(() => {
    if (!marca?.id || !modelo?.id) {
      setSeries([]);
      setSerie(null);
      return;
    }

    const nuevasSeries = impresorasDisponibles
      .filter(
        (i) =>
          i?.impresora?.marca?.id === marca.id &&
          i?.impresora?.modelo?.id === modelo.id
      )
      .map((i) => ({
        id: i.id,
        numeroSerie: i.numeroSerie,
      })).sort((a, b) => a.numeroSerie.localeCompare(b.numeroSerie)); 

    setSeries(nuevasSeries);

    if (serie && !nuevasSeries.find((s) => s.id === serie.id)) {
      setSerie(null);
    }
  }, [marca, modelo, serie, impresorasDisponibles]);

  // --- API calls ---
  const cargarServicios = async () => {
    try {
      const res = await axios.get(serviciosUrl);
      setServicios(res.data || []);
    } catch {
      setServicios([]);
    }
  };

  const cargarImpresorasDisponibles = async () => {
    try {
      const res = await axios.get(impresoraFisicaUrl); // 👈 trae todas las físicas
      const raw = Array.isArray(res.data) ? res.data : [];

      // Filtrar solo habilitadas y sin entrega activa
      const disponibles = raw.filter(
        (f) => f.flagHabilitado && (!f.servicios || f.servicios.length === 0)
      );

      setImpresorasDisponibles(disponibles);
      //console.log("impresoras físicas crudas:", res.data);
    } catch (error) {
      console.error("Error al cargar impresoras disponibles:", error);
      setImpresorasDisponibles([]);
    }
  };

  const entregarImpresora = async () => {
    if (!servicio?.id || !serie?.id) {
      addToast("❌ Debes seleccionar servicio y serie", "warning");
      return;
    }

    try {      
      await axios.post(impresorasServicioUrl, {       
        numeroSerie: serie.numeroSerie,
        servicioId: servicio.id,
      });
      addToast("✅ Impresora entregada correctamente", "success");

      // limpiar selección y recargar base
      handleCancelar();
      await cargarImpresorasDisponibles();
    } catch (error) {
      console.error("Error al entregar impresora:", error);
      addToast("❌ Error al entregar impresora", "danger");
    }
  };

  const handleCancelar = () => {
    setMarca(null);
    setModelo(null);
    setSerie(null);
    setServicio(null);
    navigate("/");
  };

  return {
    servicio,
    marca,
    modelo,
    serie,
    servicios,
    marcas,
    modelos,
    series,
    setServicio,
    setMarca,
    setModelo,
    setSerie,
    handleCancelar,
    entregarImpresora,
  };
}
