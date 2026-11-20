// ============================================================================
// pages/Impresoras/hooks/useDarDeBajaImpresoraForm.jsx
// Lógica de la pantalla Impresoras → Baja Impresora.
//
// Ahora la baja es de la IMPRESORA LÓGICA (marca + modelo), no de una unidad
// física por serie. Todo el trabajo pesado lo hace el backend:
//   1. GET  /impresoras/baja-logica/previa → qué pasaría (no modifica nada)
//   2. PUT  /impresoras/baja-logica        → hace la baja (transacción)
//
// Secciones:
//   1. Imports
//   2. Estado
//   3. Carga de marcas y modelos
//   4. Acciones: solicitar baja (previa), confirmar baja, cancelar
//   5. Valor que devuelve el hook
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Imports
// ---------------------------------------------------------------------------
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { marcaUrl, modeloUrl, impresoraUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";

// Código que devuelve el backend cuando todavía hay servicios con impresoras
// de ese modelo asignadas (ver impresoraService.darDeBajaLogica).
const CODIGO_CON_SERVICIOS = "IMPRESORA_CON_SERVICIOS";

export default function useDarDeBajaImpresoraForm() {
  // -------------------------------------------------------------------------
  // 2. Estado
  // -------------------------------------------------------------------------
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const [marca, setMarca] = useState(null);
  const [modelo, setModelo] = useState(null);

  // Respuesta de la consulta previa. null = todavía no se consultó.
  // Forma: { marca, modelo, puedeDarseDeBaja, servicios, unidadesEnDeposito,
  //          insumos, marcaQuedaVacia }
  const [previa, setPrevia] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  // -------------------------------------------------------------------------
  // 3. Carga de marcas y modelos
  // -------------------------------------------------------------------------

  // Al entrar: traer las marcas habilitadas.
  useEffect(() => {
    let cancelado = false;

    const cargarMarcas = async () => {
      try {
        const res = await axios.get(marcaUrl);
        const raw = Array.isArray(res.data) ? res.data : res.data.marca;
        if (!cancelado) setMarcas((raw || []).filter((m) => m.flagHabilitado));
      } catch {
        if (!cancelado) setMarcas([]);
      }
    };

    cargarMarcas();
    return () => {
      cancelado = true;
    };
  }, []);

  // Al elegir (o cambiar) la marca: limpiar modelo y resultado anterior, y
  // traer los modelos habilitados de esa marca.
  useEffect(() => {
    let cancelado = false;
    setModelo(null);
    setPrevia(null);

    if (!marca?.id) {
      setModelos([]);
      return;
    }

    const cargarModelos = async () => {
      try {
        const res = await axios.get(`${modeloUrl}/porMarca?idMarca=${marca.id}`);
        const raw = Array.isArray(res.data) ? res.data : res.data.modelo;
        // "cancelado" evita pisar la lista si el usuario cambió de marca
        // mientras esta respuesta todavía viajaba.
        if (!cancelado) setModelos((raw || []).filter((m) => m.flagHabilitado));
      } catch {
        if (!cancelado) setModelos([]);
      }
    };

    cargarModelos();
    return () => {
      cancelado = true;
    };
  }, [marca?.id]);

  // Al cambiar el modelo, el resultado de la consulta anterior ya no vale.
  useEffect(() => {
    setPrevia(null);
  }, [modelo?.id]);

  // -------------------------------------------------------------------------
  // 4. Acciones
  // -------------------------------------------------------------------------

  // Muestra el mensaje de error que mandó el backend (o uno genérico).
  const mostrarError = (error, mensajeGenerico) => {
    console.error(mensajeGenerico, error);
    addToast(`❌ ${error.response?.data?.error || mensajeGenerico}`, "danger");
  };

  // Botón "Baja": primero consulta qué pasaría.
  //  - Si hay servicios con impresoras de ese modelo → se muestra la lista
  //    (la pantalla la dibuja a partir de `previa`) y NO se pide confirmación.
  //  - Si no hay → se abre la confirmación con el detalle de lo que se dará
  //    de baja.
  const solicitarConfirmacion = async () => {
    if (!marca?.id || !modelo?.id || procesando) return;

    setProcesando(true);
    try {
      const res = await axios.get(`${impresoraUrl}/baja-logica/previa`, {
        params: { marcaId: marca.id, modeloId: modelo.id },
      });
      setPrevia(res.data);
      if (res.data.puedeDarseDeBaja) setShowConfirm(true);
    } catch (error) {
      mostrarError(error, "Error al consultar la baja de la impresora");
    } finally {
      setProcesando(false);
    }
  };

  const cancelarConfirmacion = () => {
    setShowConfirm(false);
  };

  // El usuario confirmó: se ejecuta la baja en el backend.
  const confirmarBaja = async () => {
    setShowConfirm(false);
    if (!marca?.id || !modelo?.id || procesando) return;

    setProcesando(true);
    try {
      const res = await axios.put(`${impresoraUrl}/baja-logica`, {
        marcaId: marca.id,
        modeloId: modelo.id,
      });

      const r = res.data;
      addToast(
        `✅ Impresora ${r.marca} ${r.modelo} dada de baja` +
          (r.marcaDadaDeBaja ? ` (también la marca ${r.marca})` : ""),
        "success"
      );
      handleCancelar();
    } catch (error) {
      const data = error.response?.data;

      if (
        error.response?.status === 409 &&
        data?.code === CODIGO_CON_SERVICIOS
      ) {
        // Entre la consulta y la confirmación alguien entregó una impresora
        // de este modelo: mostramos la lista actualizada de servicios.
        setPrevia({
          ...previa,
          puedeDarseDeBaja: false,
          servicios: data.data?.servicios || [],
        });
      } else {
        mostrarError(error, "Error al dar de baja la impresora");
      }
    } finally {
      setProcesando(false);
    }
  };

  const handleCancelar = () => {
    setMarca(null);
    setModelo(null);
    setPrevia(null);
    navigate("/");
  };

  // -------------------------------------------------------------------------
  // 5. Valor que devuelve el hook
  // -------------------------------------------------------------------------
  return {
    marca,
    modelo,
    marcas,
    modelos,
    previa,
    procesando,
    setMarca,
    setModelo,
    handleCancelar,
    showConfirm,
    solicitarConfirmacion,
    cancelarConfirmacion,
    confirmarBaja,
  };
}
