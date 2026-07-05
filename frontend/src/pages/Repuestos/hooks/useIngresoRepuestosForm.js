import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { proveedoresUrl, repuestosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useIngresoRepuestosForm() {
  const [proveedores, setProveedores] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [remito, setRemito] = useState("");
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [items, setItems] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate(); 


  useEffect(() => {
    axios.get(proveedoresUrl).then(res => setProveedores(res.data));    
    axios.get(repuestosUrl).then(res => setRepuestos(res.data));
  }, []);

  const agregarItem = () => {
    if (!repuestoSeleccionado || !cantidad) return;
    setItems([
  ...items,
  {
    repuestoId: repuestoSeleccionado.id,
    descripcion: repuestoSeleccionado.repuesto, // 👈 usar la propiedad correcta
    cantidad
  }
]);

    setRepuestoSeleccionado(null);
    setCantidad("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ Clonar la lista actual
  let itemsFinal = [...items];

  // 2️⃣ Si los inputs NO están vacíos, agregarlos a la lista
  if (repuestoSeleccionado && cantidad) {
    itemsFinal.push({
      repuestoId: repuestoSeleccionado.id,
      descripcion: repuestoSeleccionado.repuesto,
      cantidad
    });
  }

  // 3️⃣ Validar: si no hay proveedor, remito o la lista está vacía → error
  if (!proveedorSeleccionado || !remito || itemsFinal.length === 0) {
    addToast("❌ Faltan datos", "danger");
    return;
  }

  // 4️⃣ Enviar al backend siempre con la lista final
  try {
    await axios.post(`${repuestosUrl}/ingreso`, {
      proveedorId: proveedorSeleccionado.id,
      remito,
      items: itemsFinal.map(it => ({
        repuestoId: it.repuestoId,
        cantidad: it.cantidad
      }))
    });
    addToast("✅ Ingreso registrado correctamente", "success");
    handleCancelar();
  } catch (error) {
    const msg = error?.response?.data?.error || "❌ Error al registrar ingreso";
    addToast(msg, "danger");
  }
};

  const handleCancelar = () => {
    setProveedorSeleccionado(null);
    setRemito("");
    setRepuestoSeleccionado(null);
    setCantidad("");
    setItems([]);
    navigate("/");
  };

  return {
    proveedores,
    repuestos,
    proveedorSeleccionado,
    setProveedorSeleccionado,
    remito,
    setRemito,
    repuestoSeleccionado,
    setRepuestoSeleccionado,
    cantidad,
    setCantidad,
    items,
    agregarItem,
    handleSubmit,
    handleCancelar,
  };
}