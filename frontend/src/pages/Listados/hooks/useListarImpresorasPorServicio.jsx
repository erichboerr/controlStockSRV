import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { serviciosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";
import { useNavigate } from "react-router-dom";

export default function useListarImpresorasPorServicio() {
  const [servicios, setServicios] = useState([]);
  const [servicio, setServicio] = useState(null);
  const [impresoras, setImpresoras] = useState([]);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cargarServicios();
  }, []);

  useEffect(() => {
    if (servicio?.id) {
      cargarImpresoras(servicio.id);
    } else {
      setImpresoras([]);
    }
  }, [servicio?.id]);

  const cargarServicios = async () => {
    try {
      const res = await axios.get(serviciosUrl);
      setServicios(res.data || []);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      setServicios([]);
      addToast("❌ Error al cargar servicios", "danger");
    }
  };

  const cargarImpresoras = async (servicioId) => {
    try {
      const res = await axios.get(`${serviciosUrl}/${servicioId}/impresoras`);
      setImpresoras(res.data || []);
    } catch (error) {
      console.error("Error al cargar impresoras:", error);
      setImpresoras([]);
      addToast("❌ Error al cargar impresoras", "danger");
    }
  };

  const handleCancelar = () => {
    setServicio(null);
    setImpresoras([]);
    navigate("/");
  };

  return {
    servicio,
    servicios,
    impresoras,
    setServicio,
    handleCancelar,
  };
}
