import { useEffect, useState } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { reportesUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useReporteStock() {
  const [data, setData] = useState([]);
  const { addToast } = useToast();

useEffect(() => {
  axios.get(`${reportesUrl}/stock`)
    .then(res => setData(res.data))
    .catch(() => addToast("❌ Error al cargar stock", "danger"));
    console.log("url backend: ->" + reportesUrl);
}, [addToast]); // ✅ solo se ejecuta una vez

  return { data };
}
