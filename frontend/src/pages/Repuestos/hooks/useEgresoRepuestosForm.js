import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { serviciosUrl, repuestosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";
import { pdfEgreso } from "../helpers/PdfEgreso.js";

export default function useEgresoRepuestosForm() {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const [repuestos, setRepuestos] = useState([]);
  const [repuestosSeleccionado, setRepuestosSeleccionado] = useState(null);

  const [cantidad, setCantidad] = useState("");
  const [listaEgreso, setListaEgreso] = useState([]);

  // ✅ Estados para impresión y control de flujo
  const [egresoParaImprimir, setEgresoParaImprimir] = useState(null);
  const [showConfirmPrint, setShowConfirmPrint] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  // ✅ Cargar servicios y repuestos
  useEffect(() => {
    cargarServicios();
    cargarRepuestos();
  }, []);

  const cargarServicios = () => {
    axios.get(serviciosUrl).then((res) => setServicios(res.data));
  };

  const cargarRepuestos = () => {
    axios.get(repuestosUrl).then((res) => setRepuestos(res.data));
  };

  // ✅ Imprimir desde el estado actual (antes de entregar)
  const handleImprimir = () => {
    if (!servicioSeleccionado || listaEgreso.length === 0) {
      addToast("❌ No hay datos para imprimir", "danger");
      return;
    }

    pdfEgreso({
      servicio: servicioSeleccionado,
      lista: listaEgreso,
    });
  };

  // ✅ Confirmar impresión luego de entregar (usa egresoParaImprimir)
  const confirmarImpresion = () => {
    if (egresoParaImprimir) {
      pdfEgreso(egresoParaImprimir);
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
    if (!repuestosSeleccionado || !cantidad) return;

    try {
      const res = await axios.get(
        `${repuestosUrl}/${repuestosSeleccionado.id}`
      );
      const stockActual = res.data.stock;

      if (parseInt(cantidad, 10) > stockActual) {
        addToast(`❌ Stock insuficiente. Disponible: ${stockActual}`, "danger");
        return;
      }

      const nuevoItem = {
        repuestoId: repuestosSeleccionado.id,
        repuesto: repuestosSeleccionado.repuesto,
        cantidad: parseInt(cantidad, 10),
      };

      setListaEgreso((prev) => [...prev, nuevoItem]);
      setCantidad("");
      setRepuestosSeleccionado(null);
    } catch {
      addToast("❌ Error al validar stock", "danger");
    }
  };

  // ✅ Eliminar ítem
  const handleEliminar = (repuestoId) => {
    setListaEgreso((prev) =>
      prev.filter((item) => item.repuestoId !== repuestoId)
    );
  };

  // ✅ Enviar egreso con validación final de stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviando) return;
    setEnviando(true);

    // Clonar lista actual
    let itemsFinal = [...listaEgreso];

    // Si hay selección pendiente, agregarla
    if (repuestosSeleccionado && cantidad) {
      itemsFinal.push({
        repuestoId: repuestosSeleccionado.id, // 👈 usar repuestoId siempre
        repuesto: repuestosSeleccionado.repuesto,
        cantidad: parseInt(cantidad, 10),
      });
    }

    // Validar datos obligatorios
    if (!servicioSeleccionado || itemsFinal.length === 0) {
      addToast("❌ Faltan datos", "danger");
      setEnviando(false);
      return;
    }

    // ✅ Validación final de stock
    for (const it of itemsFinal) {
      try {
        const res = await axios.get(`${repuestosUrl}/${it.repuestoId}`);
        const stockActual = res.data.stock;

        if (it.cantidad > stockActual) {
          addToast(
            `❌ Stock insuficiente para ${it.repuesto}. Disponible: ${stockActual}`,
            "danger"
          );
          setEnviando(false);
          return;
        }
      } catch {
        addToast("❌ Error al validar stock", "danger");
        setEnviando(false);
        return;
      }
    }

    // ✅ Registrar egreso
    try {
      await axios.post(`${repuestosUrl}/egreso`, {
        servicioId: servicioSeleccionado.id,
        items: itemsFinal.map((it) => ({
          repuestoId: it.repuestoId,
          cantidad: it.cantidad,
        })),
      });

      addToast("✅ Egreso registrado correctamente", "success");

      // Guardar datos para imprimir
      setEgresoParaImprimir({
        servicio: servicioSeleccionado,
        lista: itemsFinal,
      });

      setShowConfirmPrint(true); // 👈 abre modal
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
    setRepuestosSeleccionado(null);
    setCantidad("");
    setListaEgreso([]);
    navigate("/");
  };

  return {
    servicios,
    servicioSeleccionado,
    setServicioSeleccionado,
    repuestos,
    repuestosSeleccionado,
    setRepuestosSeleccionado,
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
