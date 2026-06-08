import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { reportesUrl, insumoUrl } from '../../../config/env.js';
import { useToast } from '../../../common/hooks/useToast.js';
import axios from '../../../common/config/axiosInstance.js';

export function useReporteIngresosPorInsumo() {
  const [desde, setDesde] = useState(
    dayjs().startOf('month').format('YYYY-MM-DD')
  );
  const [hasta, setHasta] = useState(dayjs().format('YYYY-MM-DD'));
  const [insumos, setInsumos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  // ✅ Cargar insumos 
  const cargarInsumos = useCallback(async () => {
    try {
      const res = await axios.get(`${insumoUrl}/`);
      setInsumos(res.data);
    } catch {
      addToast('Error al cargar insumos', 'error');
    }
  }, [addToast]);

   useEffect(() => {
    cargarInsumos();
  }, [cargarInsumos]);

 const buscar = async () => {
  if (!seleccionado) {
    addToast("Debe seleccionar un insumo", "warning");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.get(
      `${reportesUrl}/ingresosPorInsumo?desde=${desde}&hasta=${hasta}&insumo=${seleccionado?.id}`
    );
    setIngresos(res.data);
    addToast("Ingresos cargados correctamente", "success");
  } catch {
    addToast("Error de conexión con el servidor", "error");
  }
  setLoading(false);
};

  // ✅ Limpiar filtros y resultados
  const limpiar = () => {
    setInsumos([]);
    setIngresos([]);
    setSeleccionado(null);
    setDesde(dayjs().startOf('month').format('YYYY-MM-DD'));
    setHasta(dayjs().format('YYYY-MM-DD'));
    addToast('Filtros y resultados limpiados', 'info');
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
