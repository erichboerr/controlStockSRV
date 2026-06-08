import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { serviciosUrl, impresorasServicioUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useRetirarImpresoraCrud() {
  const [servicios, setServicios] = useState([]);
  const [impresorasActivas, setImpresorasActivas] = useState([]);
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

  // Al cambiar servicio, cargar impresoras activas y resetear cascada
  useEffect(() => {
    if (servicio?.id) {
      cargarImpresorasActivas(servicio.id);
      setMarca(null);
      setModelo(null);
      setSerie(null);
    } else {
      setImpresorasActivas([]);
      setMarcas([]);
      setModelos([]);
      setSeries([]);
    }
  }, [servicio?.id]);

  // Derivar marcas desde la base
  useEffect(() => {
    const nuevasMarcas = [];
    impresorasActivas.forEach((i) => {
      const marcaObj = i?.impresoraFisica?.impresora?.marca;
      if (marcaObj && !nuevasMarcas.find((m) => m.id === marcaObj.id)) {
        nuevasMarcas.push(marcaObj);
      }
    });
    setMarcas(nuevasMarcas);

    if (marca && !nuevasMarcas.find((m) => m.id === marca.id)) {
      setMarca(null);
      setModelo(null);
      setSerie(null);
    }
  }, [impresorasActivas, marca]);

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
    impresorasActivas
      .filter((i) => i?.impresoraFisica?.impresora?.marca?.id === marca.id)
      .forEach((i) => {
        const modeloObj = i?.impresoraFisica?.impresora?.modelo;
        if (modeloObj && !nuevosModelos.find((m) => m.id === modeloObj.id)) {
          nuevosModelos.push(modeloObj);
        }
      });

    setModelos(nuevosModelos);

    if (modelo && !nuevosModelos.find((m) => m.id === modelo.id)) {
      setModelo(null);
      setSerie(null);
    }
  }, [marca, modelo, impresorasActivas]);

  // Derivar series filtradas por marca + modelo
  useEffect(() => {
    if (!marca?.id || !modelo?.id) {
      setSeries([]);
      setSerie(null);
      return;
    }

    const nuevasSeries = impresorasActivas
      .filter(
        (i) =>
          i?.impresoraFisica?.impresora?.marca?.id === marca.id &&
          i?.impresoraFisica?.impresora?.modelo?.id === modelo.id
      )
      .map((i) => ({
        id: i.impresoraFisica.id,
        numeroSerie: i.impresoraFisica.numeroSerie,       
      }));

    setSeries(nuevasSeries);

    if (serie && !nuevasSeries.find((s) => s.id === serie.id)) {
      setSerie(null);
    }
  }, [marca, modelo, impresorasActivas]);

  // --- API calls ---
  const cargarServicios = async () => {
    try {
      const res = await axios.get(serviciosUrl);
      setServicios(res.data || []);
    } catch {
      setServicios([]);
    }
  };

  const cargarImpresorasActivas = async (servicioId) => {
    try {
      const res = await axios.get(
        `${impresorasServicioUrl}/activas/${servicioId}`
      );
      setImpresorasActivas(res.data || []);
    } catch (error) {
      console.error("Error al cargar impresoras activas:", error);
      setImpresorasActivas([]);
    }
  };

  const retirarImpresora = async () => {
    if (!servicio?.id || !serie?.id) {
      addToast("❌ Debes seleccionar servicio y serie", "danger");
      return;
    }

    try {
      await axios.put(`${impresorasServicioUrl}/retirar`, {
        impresoraFisicaId: serie.id,
        servicioId: servicio.id,
      });
      addToast("✅ Impresora retirada correctamente", "success");

      // limpiar selección y recargar base para reflejar retiro
      handleCancelar();
      await cargarImpresorasActivas(servicio.id);
    } catch (error) {
      console.error("Error al retirar impresora:", error);
      addToast("❌ Error al retirar impresora", "danger");
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
    retirarImpresora,
  };
}