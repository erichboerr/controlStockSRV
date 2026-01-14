import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { proveedoresUrl, insumoUrl, ingresoUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useIngresoForm() {
  const [proveedores, setProveedores] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [remito, setRemito] = useState("");
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [items, setItems] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(proveedoresUrl).then(res => setProveedores(res.data || [] ));    
    axios.get(insumoUrl).then(res => setInsumos(res.data || []));
  }, []);

  const agregarItem = () => {
    if (!insumoSeleccionado || !cantidad) return;
    console.log("Agregando item:", insumoSeleccionado, cantidad);
    setItems([
  ...items,
  {
    idInsumo: insumoSeleccionado.id,
    descripcion: insumoSeleccionado.insumo, 
    cantidad
  }
]);

    setInsumoSeleccionado(null);
    setCantidad("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ Clonar la lista actual
  let itemsFinal = [...items];

  // 2️⃣ Si los inputs NO están vacíos, agregarlos a la lista
  if (insumoSeleccionado && cantidad) {
    itemsFinal.push({
      idInsumo: insumoSeleccionado.id,
      descripcion: insumoSeleccionado.insumo,
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
    await axios.post(ingresoUrl, {
      proveedorId: proveedorSeleccionado.id,
      remito,
      items: itemsFinal.map(it => ({
        insumoId: it.idInsumo,
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
    setInsumoSeleccionado(null);
    setCantidad("");
    setItems([]);
    navigate("/");
  };

  return {
    proveedores,
    insumos,
    proveedorSeleccionado,
    setProveedorSeleccionado,
    remito,
    setRemito,
    insumoSeleccionado,
    setInsumoSeleccionado,
    cantidad,
    setCantidad,
    items,
    agregarItem,
    handleSubmit,
    handleCancelar,
  };
}