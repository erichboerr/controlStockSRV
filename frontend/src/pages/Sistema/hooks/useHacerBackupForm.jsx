import { useState } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { backupUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useHacerBackupForm() {
  const [generando, setGenerando] = useState(false);
  const [ultimoBackup, setUltimoBackup] = useState(null);

  const { addToast } = useToast();

  const generarBackup = async () => {
    setGenerando(true);
    try {
      const res = await axios.post(`${backupUrl}/crear`);
      setUltimoBackup(res.data);
      addToast(`✅ Backup generado: ${res.data.archivo}`, "success");
    } catch (error) {
      const mensaje =
        error?.response?.data?.error || "Error al generar el backup";
      addToast(`❌ ${mensaje}`, "danger");
    } finally {
      setGenerando(false);
    }
  };

  return { generando, ultimoBackup, generarBackup };
}
