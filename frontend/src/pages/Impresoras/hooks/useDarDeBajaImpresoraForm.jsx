import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import {
  serviciosUrl,
  impresorasServicioUrl,
  impresoraFisicaUrl,
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useDarDeBajaImpresoraForm() {
  const [servicios, setServicios] = useState([]);
  const [impresorasActivas, setImpresorasActivas] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [series, setSeries] = useState([]);

  const [servicio, setServicio] = useState(null);
  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [serie, setSerie] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarServicios();
  }, []);

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

  // Derivar marcas
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

  // Derivar modelos
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

  // Derivar series
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
  }, [marca, modelo, serie, impresorasActivas]);

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

  // ✅ Abrir modal
  const solicitarConfirmacion = () => {
    if (!serie?.id) {
      addToast("❌ Debes seleccionar una impresora", "danger");
      return;
    }
    setShowConfirm(true);
  };

  // ✅ Cerrar modal
  const cancelarConfirmacion = () => {
    setShowConfirm(false);
  };

  // ✅ Ejecutar baja (solo si el usuario confirma)
  const confirmarBaja = async () => {
    setShowConfirm(false);

    if (!serie?.id || procesando) return;

    setProcesando(true);

    try {
      await axios.put(`${impresoraFisicaUrl}/baja`, {
        impresoraFisicaId: serie.id,
      });
      await axios.put(`${impresorasServicioUrl}/retirar`, {
        impresoraFisicaId: serie.id,
        servicioId: servicio.id,
      });

      addToast("✅ Impresora dada de baja correctamente", "success");

      // recargar combos y limpiar set
      cargarServicios();
      handleCancelar();

    } catch (error) {
      console.error("Error al dar de baja impresora:", error);
      addToast("❌ Error al dar de baja impresora", "danger");
    } finally {
      setProcesando(false);
    }
  };

  const handleCancelar = () => {
    setServicio(null);
    setMarca(null);
    setModelo(null);
    setSerie(null);
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

    // ✅ NUEVO
    showConfirm,
    solicitarConfirmacion,
    cancelarConfirmacion,
    confirmarBaja,
  };
}
