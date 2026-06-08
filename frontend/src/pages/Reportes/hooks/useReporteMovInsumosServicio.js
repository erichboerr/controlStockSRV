import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { reportesUrl, serviciosUrl } from '../../../config/env.js';
import { useToast } from '../../../common/hooks/useToast.js';
import axios from '../../../common/config/axiosInstance.js';

export function useReporteMovInsumosServicio() {
  const { addToast } = useToast();

  const [desde, setDesde] = useState(
    dayjs().startOf('month').format('YYYY-MM-DD')
  );

  const [hasta, setHasta] = useState(dayjs().format('YYYY-MM-DD'));
  const [servicios, setServicios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Cargar servicios al inicio
  const cargarServicios = useCallback(async () => {
    try {
      const res = await axios.get(`${serviciosUrl}/`);
      setServicios(res.data);
    } catch {
      addToast('Error al cargar servicios', 'error');
    }
  }, [addToast]);

  useEffect(() => {
    cargarServicios();
  }, [cargarServicios]);

  const buscar = async () => {
    if (!seleccionado) {
      addToast('Debe seleccionar un servicio', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${reportesUrl}/movimientosInsumosServicios?desde=${desde}&hasta=${hasta}&servicio=${seleccionado?.id}`
      );
      setMovimientos(res.data);
      addToast('Movimientos cargados correctamente', 'success');
    } catch {
      addToast('Error de conexión con el servidor', 'error');
    }
    setLoading(false);
  };

  // ✅ Limpiar filtros y resultados
  const limpiar = () => {
    setMovimientos([]);
    setSeleccionado(null);
    setDesde(dayjs().startOf('month').format('YYYY-MM-DD'));
    setHasta(dayjs().format('YYYY-MM-DD'));
    addToast('Filtros y resultados limpiados', 'info');
    cargarServicios();
  };

  return {
    desde,
    hasta,
    servicios,
    movimientos,
    setMovimientos,
    loading,
    setDesde,
    setHasta,
    seleccionado,
    setSeleccionado,
    buscar,
    limpiar,
  };
}
