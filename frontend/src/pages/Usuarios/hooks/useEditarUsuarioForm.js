import { useState, useEffect } from "react";
import axios from "../../../common/config/axiosInstance.js";
import { usuariosUrl, rolesUrl } from "../../../config/env.js";
import { useToast } from "../../../common/hooks/useToast.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function useEditarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const cargarDatos = () => {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);

    axios
      .get(usuariosUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let usuarios = res.data;

        // Si no sos root, filtrás los usuarios con rolId = 1
        if (decoded.rolId !== 1) {
          usuarios = usuarios.filter((u) => u.rolId !== 1);
        }

        setUsuarios(usuarios);
      })
      .catch((error) => {
        console.error("Error al cargar usuarios:", error.message);
        setUsuarios([]);
      });

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
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleUsuarioSelect = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setRolSeleccionado(null);
  };

  const handleRolSelect = (rol) => {
    setRolSeleccionado(rol);
  };

  const handleCancelar = () => {
    setUsuarioSeleccionado(null);
    setRolSeleccionado(null);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSeleccionado?.id || !rolSeleccionado?.id) {
      addToast("❌ Faltan datos", "danger");
      return;
    }

    try {
      await axios.put(`${usuariosUrl}/${usuarioSeleccionado.id}`, {
        rolId: rolSeleccionado.id,
      });
      cargarDatos();
      handleCancelar();
      addToast("✅ Rol actualizado correctamente", "success");
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "❌ Error al actualizar";
      addToast(msg, "danger");
    }
  };

  return {
    usuarios,
    roles,
    usuarioSeleccionado,
    rolSeleccionado,
    handleUsuarioSelect,
    handleRolSelect,
    handleCancelar,
    handleSubmit,
  };
}
