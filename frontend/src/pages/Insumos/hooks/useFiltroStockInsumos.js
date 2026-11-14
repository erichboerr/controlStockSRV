import { useEffect, useState } from "react";
import { marcaUrl, modeloUrl, insumoUrl } from "../../../config/env.js";
import axios from "../../../common/config/axiosInstance.js";

export function useFiltroStockInsumos(marcaSeleccionada) {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    axios.get(marcaUrl).then((res) => setMarcas(res.data || []));
    axios.get(insumoUrl).then((res) => setInsumos(res.data || []));
  }, []);

  // Modelos en cascada: si hay marca elegida, solo los modelos de esa marca
  useEffect(() => {
    const url = marcaSeleccionada
      ? `${modeloUrl}/porMarca?idMarca=${marcaSeleccionada}`
      : modeloUrl;

    axios.get(url).then((res) => setModelos(res.data || []));
  }, [marcaSeleccionada]);

  return { marcas, modelos, insumos };
}
