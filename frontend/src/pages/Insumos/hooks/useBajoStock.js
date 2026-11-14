import { useEffect, useState } from "react";
import { insumoUrl } from "../../../config/env.js";
import axios from "../../../common/config/axiosInstance.js";

export function useBajoStock({ marcaId, modeloId, insumoId } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (marcaId) params.marcaId = marcaId;
      if (modeloId) params.modeloId = modeloId;
      if (insumoId) params.insumoId = insumoId;

      const res = await axios.get(`${insumoUrl}/stock-bajo`, { params });
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar stock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marcaId, modeloId, insumoId]);

  return { data, loading, error, refresh: fetchData };
}
