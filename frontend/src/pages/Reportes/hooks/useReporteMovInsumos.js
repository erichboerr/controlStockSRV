import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { reportesUrl, insumoUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

export function useReporteMovInsumos() {
  const { addToast } = useToast();

  const [desde, setDesde] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );

  const [hasta, setHasta] = useState(dayjs().format("YYYY-MM-DD"));
  const [insumos, setInsumos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Cargar proveedores al inicio
  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    fetch(`${insumoUrl}/`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setInsumos)
      .catch(() => {
        addToast("Error al cargar insumos", "error");
      });
  };

  // ✅ Buscar movimientos
  const buscar = async () => {
    if (!seleccionado) {
      addToast("Debe seleccionar un insumo", "warning");
      return;
    }

    setLoading(true);

    try {
      const r = await fetch(
        `${reportesUrl}/movimientosInsumos?desde=${desde}&hasta=${hasta}&insumo=${seleccionado?.id}`
      );

      if (!r.ok) {
        addToast("Error al obtener movimientos", "error");
        setLoading(false);
        return;
      }

      const data = await r.json();
      setMovimientos(data);

      addToast("Movimientos cargados correctamente", "success");
    } catch (err) {
      console.log(err);
      addToast("Error de conexión con el servidor", "error");
    }

    setLoading(false);
  };

  

  // ✅ Limpiar filtros y resultados
  const limpiar = () => {
    setInsumos([]);
    setMovimientos([]);
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
    setInsumos,
    movimientos,
    loading,
    setDesde,
    setHasta,
    seleccionado,
    setSeleccionado,
    buscar,
    limpiar,
  };
}
