import { useEffect, useState } from "react";
import { repuestosUrl } from "../../../config/env.js";
//import { useToast } from "../../../common/hooks/useToast.js";
import axios from "../../../common/config/axiosInstance.js";

export function useBajoStockRepuestosForm() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const { addToast } = useToast();

  useEffect(() => {
    axios.get(`${repuestosUrl}/stock-bajo-repuestos`).then((res) => {
      //console.log("Respuesta cruda:", res.data, Array.isArray(res.data));
      setData(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}