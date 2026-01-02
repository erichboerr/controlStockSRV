import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { reportesUrl, insumoUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export function useReporteIngresosPorInsumo() {
  const [desde, setDesde] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [hasta, setHasta] = useState(dayjs().format("YYYY-MM-DD"));
  const [insumos, setInsumos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  // ✅ Cargar insumos
  useEffect(() => {
    cargarInsumos();
  }, []);
  
  const cargarInsumos = async () => {
    fetch(`${insumoUrl}/`) 
      .then((r) => r.json())
      .then(setInsumos)
      .catch(() => addToast("Error al cargar insumos", "error"));
  };
  const buscar = async () => {
    if (!seleccionado) {
      addToast("Debe seleccionar un insumo", "warning");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(
        `${reportesUrl}/ingresosPorInsumo?desde=${desde}&hasta=${hasta}&insumo=${seleccionado?.id}`
      );

      if (!r.ok) {
        addToast("Error al obtener ingresos", "error");
        setLoading(false);
        return;
      }

      const data = await r.json();
      setIngresos(data);
      addToast("Ingresos cargados correctamente", "success");
    } catch (err) {
      console.log(err);
      addToast("Error de conexión con el servidor", "error");
    }
    setLoading(false);
  };

  // ✅ Limpiar filtros y resultados
  const limpiar = () => {
    setInsumos([]);
    setIngresos([]);
    setSeleccionado(null);
    setDesde(dayjs().startOf("month").format("YYYY-MM-DD"));
    setHasta(dayjs().format("YYYY-MM-DD"));
    addToast("Filtros y resultados limpiados", "info");
    cargarInsumos();
  };

  return {
    desde,
    hasta,
    insumos,
    seleccionado,
    setSeleccionado,
    ingresos,
    loading,
    setDesde,
    setHasta,
    buscar,
    limpiar,
  };
}
