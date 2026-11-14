import { useState } from "react";
import axios from "../config/axiosInstance.js";
import { useToast } from "./useToast.js";

/**
 * Hook reutilizable para el flujo "el nombre ya existe pero está dado de
 * baja": cuando el backend responde 409 con code === "EXISTS_DISABLED",
 * en vez de mostrar el error directo le preguntamos al usuario si quiere
 * reactivar el registro existente en lugar de crear uno nuevo.
 *
 * Uso típico dentro de un hook de alta (ej. useAgregarMarcasForm):
 *
 *   const { pendiente, intentarCrear, confirmarReactivar, cancelarReactivar } =
 *     useReactivarConfirm(marcaUrl);
 *
 *   const agregarMarca = () => intentarCrear(
 *     { marca: normalizado },
 *     () => { limpiar campos, toast de éxito... },
 *     (msg) => addToast(msg, "danger"),
 *   );
 *
 * `pendiente` (null u objeto { id, nombre, bajaEl }) se usa para mostrar
 * el ConfirmModal en el componente.
 */
export function useReactivarConfirm(entidadUrl) {
  const [pendiente, setPendiente] = useState(null);
  const { addToast } = useToast();

  const intentarCrear = async (payload, onExito, onErrorGenerico) => {
    try {
      const res = await axios.post(entidadUrl, payload);
      onExito?.(res.data);
    } catch (error) {
      const data = error?.response?.data;
      if (data?.code === "EXISTS_DISABLED" && data?.data) {
        setPendiente(data.data);
        return;
      }
      const msg = data?.error || "❌ Error al guardar";
      onErrorGenerico?.(msg);
    }
  };

  const confirmarReactivar = async (onExito) => {
    if (!pendiente) return;
    try {
      const res = await axios.patch(`${entidadUrl}/${pendiente.id}/reactivar`);
      addToast("✅ Registro reactivado correctamente", "success");
      onExito?.(res.data);
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al reactivar";
      addToast(msg, "danger");
    } finally {
      setPendiente(null);
    }
  };

  const cancelarReactivar = () => setPendiente(null);

  return { pendiente, intentarCrear, confirmarReactivar, cancelarReactivar };
}
