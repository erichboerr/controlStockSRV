import { useEffect, useState } from "react";
import { insumoUrl } from "../../../config/env.js";
//import { useToast } from "../../../common/hooks/useToast.js";
import axios from "axios";

export function useBajoStock() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const { addToast } = useToast();

  useEffect(() => {
    axios.get(`${insumoUrl}/stock-bajo`).then((res) => {
      //console.log("Respuesta cruda:", res.data, Array.isArray(res.data));
      setData(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
