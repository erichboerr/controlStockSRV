import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  serviciosUrl,
  impresorasServicioUrl,
  insumoUrl,
  egresoUrl,
  stockUrl,
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";
import { generarPdfEgreso } from "../../../common/helpers/generarPdfEgreso.js";

export default function useEgresoInsumosForm() {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  const [modelosMap, setModelosMap] = useState({});
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

  const [insumos, setInsumos] = useState([]);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);

  const [cantidad, setCantidad] = useState("");
  const [listaEgreso, setListaEgreso] = useState([]);

  // ✅ Estados para impresión y control de flujo
  const [egresoParaImprimir, setEgresoParaImprimir] = useState(null);
  const [showConfirmPrint, setShowConfirmPrint] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  // ✅ Cargar servicios
  useEffect(() => {
    axios.get(serviciosUrl).then((res) => setServicios(res.data));
  }, []);

  // ✅ Cargar marcas y modelos según servicio
  useEffect(() => {
    if (!servicioSeleccionado) return;

    axios
      .get(`${impresorasServicioUrl}/activas/${servicioSeleccionado.id}`)
      .then((res) => {
        const filas = res.data;

        const marcasUnicas = new Map();
        const modelosPorMarca = new Map();

        for (const fila of filas) {
          const impresora = fila?.impresoraFisica?.impresora;
          const marca = impresora?.marca;
          const modelo = impresora?.modelo;

          if (marca?.id) {
            marcasUnicas.set(marca.id, marca);

            if (!modelosPorMarca.has(marca.id)) {
              modelosPorMarca.set(marca.id, new Map());
            }

            if (modelo?.id) {
              modelosPorMarca.get(marca.id).set(modelo.id, modelo);
            }
          }
        }

        setMarcas(Array.from(marcasUnicas.values()));
        setModelosMap(
          Object.fromEntries(
            Array.from(modelosPorMarca.entries()).map(([marcaId, modelos]) => [
              marcaId,
              Array.from(modelos.values()),
            ])
          )
        );
      })
      .catch(() => {
        setMarcas([]);
        setModelosMap({});
      });
  }, [servicioSeleccionado]);

  // ✅ Cargar insumos según modelo
  useEffect(() => {
    if (!modeloSeleccionado) return;

    axios
      .get(`${insumoUrl}/modelo?modeloId=${modeloSeleccionado.id}`)
      .then((res) => {
        const insumosData = res.data.map((i) => ({
          id: i.id,
          insumo: i.insumo,
          flagHabilitado: i.flagHabilitado,
        }));
        setInsumos(insumosData);
      })
      .catch(() => setInsumos([]));
  }, [modeloSeleccionado]);

  // ✅ Imprimir desde el estado actual (antes de entregar)
  const handleImprimir = () => {
    if (!servicioSeleccionado || listaEgreso.length === 0) {
      addToast("❌ No hay datos para imprimir", "danger");
      return;
    }

    generarPdfEgreso({
      servicio: servicioSeleccionado,
      marca: marcaSeleccionada,
      modelo: modeloSeleccionado,
      lista: listaEgreso,
    });
  };

  // ✅ Confirmar impresión luego de entregar (usa egresoParaImprimir)
  const confirmarImpresion = () => {
    if (egresoParaImprimir) {
      generarPdfEgreso(egresoParaImprimir);
    }
    cerrarModalImpresion();
  };

  // ✅ Cerrar modal, limpiar formulario y desbloquear submit
  const cerrarModalImpresion = () => {
    setShowConfirmPrint(false);
    setEgresoParaImprimir(null);
    handleCancelar();
    setEnviando(false);
  };

  // ✅ Agregar ítem con validación de stock
  const handleAgregar = async () => {
    if (!insumoSeleccionado || !cantidad) return;

    try {
      const res = await axios.get(`${stockUrl}/${insumoSeleccionado.id}`);
      const stockActual = res.data.stock;

      if (parseInt(cantidad, 10) > stockActual) {
        addToast(`❌ Stock insuficiente. Disponible: ${stockActual}`, "danger");
        return;
      }

      const nuevoItem = {
        idInsumo: insumoSeleccionado.id,
        insumo: insumoSeleccionado.insumo,
        cantidad: parseInt(cantidad, 10),
      };

      setListaEgreso((prev) => [...prev, nuevoItem]);
      setCantidad("");
      setInsumoSeleccionado(null);
    } catch {
      addToast("❌ Error al validar stock", "danger");
    }
  };

  // ✅ Eliminar ítem
  const handleEliminar = (idInsumo) => {
    setListaEgreso((prev) => prev.filter((item) => item.idInsumo !== idInsumo));
  };

  // ✅ Enviar egreso con validación final de stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviando) return;
    setEnviando(true);

    let itemsFinal = [...listaEgreso];

    if (insumoSeleccionado && cantidad) {
      itemsFinal.push({
        idInsumo: insumoSeleccionado.id,
        insumo: insumoSeleccionado.insumo,
        cantidad: parseInt(cantidad, 10),
      });
    }

    if (!servicioSeleccionado || itemsFinal.length === 0) {
      addToast("❌ Faltan datos", "danger");
      setEnviando(false);
      return;
    }

    // ✅ Validación final de stock
    for (const it of itemsFinal) {
      const res = await axios.get(`${stockUrl}/${it.idInsumo}`);
      const stockActual = res.data.stock;

      if (it.cantidad > stockActual) {
        addToast(
          `❌ Stock insuficiente para ${it.insumo}. Disponible: ${stockActual}`,
          "danger"
        );
        setEnviando(false);
        return;
      }
    }

    try {
      await axios.post(egresoUrl, {
        servicioId: servicioSeleccionado.id,
        items: itemsFinal.map((it) => ({
          insumoId: it.idInsumo,
          cantidad: it.cantidad,
        })),
      });

      addToast("✅ Egreso registrado correctamente", "success");
      handleCancelar();  

      // ✅ Guardamos datos para imprimir
      setEgresoParaImprimir({
        servicio: servicioSeleccionado,
        marca: marcaSeleccionada,
        modelo: modeloSeleccionado,
        lista: itemsFinal,
      });

      // ✅ Abrimos modal de confirmación
      setShowConfirmPrint(true);
    } catch (error) {
      const msg =
        error?.response?.data?.error || "❌ Error al registrar egreso";
      addToast(msg, "danger");
      setEnviando(false);
    }
  };

  // ✅ Reset total
  const handleCancelar = () => {
    setServicioSeleccionado(null);
    setMarcaSeleccionada(null);
    setModeloSeleccionado(null);
    setInsumoSeleccionado(null);
    setCantidad("");
    setListaEgreso([]);
    navigate("/");
  };

  return {
    servicios,
    servicioSeleccionado,
    setServicioSeleccionado,
    marcas,
    marcaSeleccionada,
    setMarcaSeleccionada,
    modelosMap,
    modeloSeleccionado,
    setModeloSeleccionado,
    insumos,
    insumoSeleccionado,
    setInsumoSeleccionado,
    cantidad,
    setCantidad,
    listaEgreso,
    handleAgregar,
    handleEliminar,
    handleSubmit,
    handleCancelar,
    handleImprimir,
    showConfirmPrint,
    confirmarImpresion,
    cerrarModalImpresion,
    enviando,
  };
}