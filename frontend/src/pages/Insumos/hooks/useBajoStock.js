import { useEffect, useState } from "react";
import { insumoUrl } from "../../../config/env.js";
import axios from "axios";

export function useBajoStock() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${insumoUrl}/stock-bajo`);
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
  }, []);

  return { data, loading, error, refresh: fetchData };
}
