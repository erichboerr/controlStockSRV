import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { marcaUrl, modeloUrl, serviciosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";
import { useNavigate } from "react-router-dom";

export default function useListarServiciosPorModelo() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);

  const { addToast } = useToast();
  const navigate = useNavigate();

  // Cargar marcas al inicio
  useEffect(() => {
    cargarMarcas();
  }, []);

  // Al cambiar marca, cargar modelos  
  useEffect(() => {
    const actualizarModelos = async () => {
      if (marca?.id) {
        await cargarModelosPorMarca(marca.id);
        setModelo(null);
      } else {
        setModelos([]);
        setModelo(null);
      }
    };

    actualizarModelos();
  }, [marca?.id]);

  // Al cambiar modelo, cargar servicios asociados
  useEffect(() => {
    if (modelo?.id) {
      cargarServiciosPorModelo(modelo.id);
    } else {
      setServicios([]);
    }
  }, [modelo?.id]);

  // --- API calls ---
 const cargarMarcas = async () => {
    try {
      const actualizada = await axios.get(marcaUrl);
      //console.log("Respuesta marcas:", actualizada.data);
      const raw = Array.isArray(actualizada.data)
        ? actualizada.data
        : actualizada.data.marca;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setMarcas(habilitados);
      //console.log("Marcas seteadas:", habilitados);
      return habilitados;
    } catch {
      setMarcas([]);
      return [];
    }
  };

  const cargarModelosPorMarca = async (id) => {
    try {
      const res = await axios.get(`${modeloUrl}/porMarca?idMarca=${id}`);
      const raw = Array.isArray(res.data) ? res.data : res.data.modelo;
      const habilitados = raw.filter((m) => m.flagHabilitado);
      setModelos(habilitados);
      return habilitados;
    } catch {
      setModelos([]);
      return [];
    }
  };

  const cargarServiciosPorModelo = async (modeloId) => {
  try {
    const res = await axios.get(`${serviciosUrl}/por-modelo/${modeloId}`);
    setServicios(res.data || []);
  } catch (error) {
    console.error("Error al cargar servicios:", error);
    setServicios([]);
    addToast("❌ Error al cargar servicios", "danger");
  }
};


  const handleCancelar = () => {
    setMarca(null);
    setModelo(null);
    setServicios([]);
    navigate("/");
  };

  return {
    marca,
    modelo,
    marcas,
    modelos,
    servicios,
    setMarca,
    setModelo,
    handleCancelar,
  };
}
useListarServiciosPorModelo