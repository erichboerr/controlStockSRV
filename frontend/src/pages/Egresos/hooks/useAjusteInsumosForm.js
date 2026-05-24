import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import {
  insumoUrl,
  egresoUrl,
  stockUrl,
  ingresoUrl,
} from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAjusteInsumosForm() {
  const [insumos, setInsumos] = useState([]);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [listaEgreso, setListaEgreso] = useState([]);
  const [accion, setAccion] = useState("sumar");
  const [enviando, setEnviando] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    fetch(`${insumoUrl}/`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setInsumos)
      .catch(() => {
        addToast("Error al cargar insumos", "error");
      });
  };

  // ✅ Agregar ítem con stock actual
  const handleAgregar = async () => {
    if (!insumoSeleccionado || !cantidad) return;

    try {
      const res = await axios.get(`${stockUrl}/${insumoSeleccionado.id}`);
      const stockActual = res.data.stock;

      if (accion === "restar" && parseInt(cantidad, 10) > stockActual) {
        addToast(`❌ Stock insuficiente. Disponible: ${stockActual}`, "danger");
        // 👇 limpiar input y select
        setCantidad("");
        setInsumoSeleccionado(null);

        return;
      }

      const nuevoItem = {
        idInsumo: insumoSeleccionado.id,
        insumo: insumoSeleccionado.insumo,
        cantidad: parseInt(cantidad, 10),
        stockActual, // 👈 guardamos stock actual para previsualización
      };

      setListaEgreso((prev) => [...prev, nuevoItem]);
      setCantidad("");
      setInsumoSeleccionado(null);
    } catch {
      addToast("❌ Error al validar stock", "danger");
    }
  };

  const handleEliminar = (idInsumo) => {
    setListaEgreso((prev) => prev.filter((item) => item.idInsumo !== idInsumo));
  };

  // ✅ Restar con validación de stock por cada ítem
  const handleRestar = async (e) => {
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

    for (const it of itemsFinal) {
      try {
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
      } catch {
        addToast(`❌ Error al validar stock de ${it.insumo}`, "danger");
        setEnviando(false);
        return;
      }
    }

    try {
      await axios.post(egresoUrl, {
        servicioId: 1,
        items: itemsFinal.map((it) => ({
          insumoId: it.idInsumo,
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
    if (insumoSeleccionado && cantidad) {
      itemsFinal.push({
        idInsumo: insumoSeleccionado.id,
        insumo: insumoSeleccionado.insumo,
        cantidad: parseInt(cantidad, 10),
      });
    }

    try {
      await axios.post(ingresoUrl, {
        proveedorId: 1,
        remito: "ajuste",
        items: itemsFinal.map((it) => ({
          insumoId: it.idInsumo,
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
    setInsumoSeleccionado(null);
    setCantidad("");
    setListaEgreso([]);
    setAccion("sumar"); // 👈 vuelve a habilitar y setea default
    navigate("/");
  };

  return {
    insumos,
    insumoSeleccionado,
    setInsumoSeleccionado,
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
