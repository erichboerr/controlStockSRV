import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { usuariosUrl, rolesUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";
import { mapErrorToToastType } from "../../../utils/errorToastMapper.js";

export default function useAltaUsuarioForm() {
  const [roles, setRoles] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [pendienteReactivar, setPendienteReactivar] = useState(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(rolesUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.error("Error al cargar roles:", error.message);
        setRoles([]);
      });
  }, []);

  const validarCampos = () => {
    return rolSeleccionado?.id && nombre.trim() && password.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      addToast("❌ Faltan datos", "danger");
      return;
    }

    try {
      await axios.post(`${usuariosUrl}/crearUsuario`, {
        user: nombre.trim(),
        rolId: rolSeleccionado.id,
        password: password.trim(),
      });

      addToast("✅ Usuario creado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const data = error?.response?.data;

      // El usuario ya existe pero está dado de baja: en vez de mostrar el
      // error tal cual, le preguntamos si quiere reactivarlo con el rol y
      // la contraseña que acaba de tipear.
      if (data?.code === "EXISTS_DISABLED" && data?.data) {
        setPendienteReactivar(data.data);
        return;
      }

      const status = error?.response?.status;
      const msg =
        data?.error || data?.message || "❌ Error al crear usuario";

      addToast(msg, mapErrorToToastType(status));
    }
  };

  const confirmarReactivar = async () => {
    if (!pendienteReactivar) return;
    try {
      await axios.patch(`${usuariosUrl}/${pendienteReactivar.id}/reactivar`, {
        rolId: rolSeleccionado.id,
        password: password.trim(),
      });
      addToast("✅ Usuario reactivado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const msg = error?.response?.data?.error || "❌ Error al reactivar usuario";
      addToast(msg, mapErrorToToastType(error?.response?.status));
    } finally {
      setPendienteReactivar(null);
    }
  };

  const cancelarReactivar = () => setPendienteReactivar(null);

  const handleCancelar = () => {
    setRolSeleccionado(null);
    setNombre("");
    setPassword("");
    setPendienteReactivar(null);
    navigate("/");
  };

  return {
    roles,
    rolSeleccionado,
    setRolSeleccionado,
    password,
    setPassword,
    nombre,
    setNombre,
    handleSubmit,
    handleCancelar,
    pendienteReactivar,
    confirmarReactivar,
    cancelarReactivar,
  };
}
