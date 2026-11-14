import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { backupUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useRestaurarBackupForm() {
  const [backups, setBackups] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [restaurando, setRestaurando] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    cargarBackups();
  }, []);

  const cargarBackups = async () => {
    setCargando(true);
    try {
      const res = await axios.get(`${backupUrl}/listar`);
      setBackups(res.data);
    } catch (error) {
      const mensaje =
        error?.response?.data?.error || "No se pudieron listar los backups";
      addToast(`❌ ${mensaje}`, "danger");
      setBackups([]);
    } finally {
      setCargando(false);
    }
  };

  const abrirConfirmacion = () => {
    if (!seleccionado) {
      addToast("❌ Seleccioná un backup primero", "danger");
      return;
    }
    setShowConfirm(true);
  };

  const confirmarRestaurar = async () => {
    setShowConfirm(false);
    setRestaurando(true);
    try {
      await axios.post(`${backupUrl}/restaurar`, {
        archivo: seleccionado.archivo,
      });
      addToast(
        "✅ Base de datos restaurada correctamente. Recargá la página.",
        "success"
      );
    } catch (error) {
      const mensaje =
        error?.response?.data?.error || "Error al restaurar el backup";
      addToast(`❌ ${mensaje}`, "danger");
    } finally {
      setRestaurando(false);
    }
  };

  return {
    backups,
    seleccionado,
    cargando,
    restaurando,
    showConfirm,
    setSeleccionado,
    setShowConfirm,
    abrirConfirmacion,
    confirmarRestaurar,
    recargar: cargarBackups,
  };
}
