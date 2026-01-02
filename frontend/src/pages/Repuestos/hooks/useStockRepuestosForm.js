import { useEffect, useState } from "react";
import axios from "axios";
import { repuestosUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useStockRepuestosForm() {
  const [data, setData] = useState([]);
  const { addToast } = useToast();

useEffect(() => {
  axios.get(`${repuestosUrl}/StockRepuestos`)
    .then(res => setData(res.data))
    .catch(() => addToast("❌ Error al cargar stock de repuestos", "danger"));   
}, [addToast]); 

  return { data };
}
