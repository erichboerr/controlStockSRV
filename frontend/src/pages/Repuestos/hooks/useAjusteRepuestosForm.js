import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { repuestosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAjusteRepuestosForm() {
  const [repuestos, setRepuestos] = useState([]);
  const [repuestoSeleccionado, setrepuestoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [listaEgreso, setListaEgreso] = useState([]);
  const [accion, setAccion] = useState("sumar");
  const [enviando, setEnviando] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarRepuestos();
  }, []);

  const cargarRepuestos = async () => {
    fetch(`${repuestosUrl}/`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setRepuestos)
      .catch(() => {
        addToast("Error al cargar repuestos", "error");
      });
  };

  // ✅ Agregar ítem con stock actual
  const handleAgregar = async () => {
    if (!repuestoSeleccionado || !cantidad) return;

    try {
      const res = await axios.get(`${repuestosUrl}/${repuestoSeleccionado.id}`);
      const stockActual = res.data.stock;

      if (accion === "restar" && parseInt(cantidad, 10) > stockActual) {
        addToast(`❌ Stock insuficiente. Disponible: ${stockActual}`, "danger");
        // 👇 limpiar input y select
        setCantidad("");
        setrepuestoSeleccionado(null);

        return;
      }

      const nuevoItem = {
        repuestoId: repuestoSeleccionado.id,
        repuesto: repuestoSeleccionado.repuesto,
        cantidad: parseInt(cantidad, 10),
        stockActual, // 👈 guardamos stock actual para previsualización
      };

      setListaEgreso((prev) => [...prev, nuevoItem]);
      setCantidad("");
      setrepuestoSeleccionado(null);
    } catch {
      addToast("❌ Error al validar stock", "danger");
    }
  };

  const handleEliminar = (repuestoId) => {
    setListaEgreso((prev) => prev.filter((item) => item.repuestoId !== repuestoId));
  };

  // ✅ Restar con validación de stock por cada ítem
  const handleRestar = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);

    let itemsFinal = [...listaEgreso];
    if (repuestoSeleccionado && cantidad) {
      itemsFinal.push({
        repuestoId: repuestoSeleccionado.id,
        repuesto: repuestoSeleccionado.repuesto,
        cantidad: parseInt(cantidad, 10),
      });
    }

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
        addToast(`❌ Error al validar stock de ${it.repuesto}`, "danger");
        setEnviando(false);
        return;
      }
    }

    try {
      await axios.post(`${repuestosUrl}/egreso`, {
        servicioId: 1,
        items: itemsFinal.map((it) => ({
          repuestoId: it.repuestoId,
          cantidad: it.cantidad,
        })),
      });

      addToast("✅ Egreso registrado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const msg =
        error?.response?.data?.error || "❌ Error al registrar egreso";
      addToast(msg, "danger");
      setEnviando(false);
    }
  };

  // ✅ Sumar (no requiere validación de stock negativo)
  const handleSumar = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);

    let itemsFinal = [...listaEgreso];
    if (repuestoSeleccionado && cantidad) {
      itemsFinal.push({
        repuestoId: repuestoSeleccionado.id,
        insumo: repuestoSeleccionado.insumo,
        cantidad: parseInt(cantidad, 10),
      });
    }

    try {
      await axios.post(`${repuestosUrl}/ingreso`, {
        proveedorId: 1,
        remito: "AJUSTE",
        items: itemsFinal.map((it) => ({
          repuestoId: it.repuestoId,
          cantidad: it.cantidad,
        })),
      });

      addToast("✅ Ingreso registrado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const msg =
        error?.response?.data?.error || "❌ Error al registrar ingreso";
      addToast(msg, "danger");
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    setrepuestoSeleccionado(null);
    setCantidad("");
    setListaEgreso([]);
    setAccion("sumar"); // 👈 vuelve a habilitar y setea default
    navigate("/");
  };

  return {
    repuestos,
    repuestoSeleccionado,
    setrepuestoSeleccionado,
    cantidad,
    setCantidad,
    listaEgreso,
    handleAgregar,
    handleEliminar,
    handleCancelar,
    handleRestar,
    handleSumar,
    accion,
    setAccion,
    enviando,
  };
}
