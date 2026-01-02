import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { proveedoresUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEliminarProveedoresForm() {
  const [proveedores, setProveedores] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToast } = useToast(); 
  const navigate = useNavigate();

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const res = await axios.get(proveedoresUrl);
      const raw = Array.isArray(res.data) ? res.data : res.data.proveedores;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setProveedores(habilitados);
    } catch (error) {
      console.error("Error al cargar proveedores:", error.message);
      setProveedores([]);
    }
  };

  const handleCancelar = () => {
    setSeleccionado(null);
    navigate("/");
  };

  const eliminarProveedor = async () => {
    if (!seleccionado?.id) return;

    try {
      await axios.delete(`${proveedoresUrl}/${seleccionado.id}`);
      addToast("✅ Proveedor eliminado", "success");
      handleCancelar();
      await cargarProveedores();
      setShowConfirm(false); // 👈 cerrar modal
    } catch (error) {
      addToast("❌ Error al eliminar proveedor", "danger");
      console.error("Error al eliminar proveedor:", error.message);
      setShowConfirm(false); // 👈 también cerrarlo en error
    }
  };

  const confirmarEliminacion = () => setShowConfirm(true);
  const cancelarConfirmacion = () => setShowConfirm(false);

  return {
    proveedores,
    seleccionado,
    setSeleccionado,
    eliminarProveedor,
    handleCancelar,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
  };
}
