import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { proveedoresUrl } from "../../../config/env.js";
import { validarEmail } from "../../../common/helpers/validarEmail.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useEditarProveedoresForm() {
  const [proveedores, setProveedores] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [proveedor, setProveedor] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const { addToast } = useToast(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const res = await axios.get(proveedoresUrl);
      const raw = Array.isArray(res.data) ? res.data : res.data.proveedores;
      const habilitados = raw.filter((p) => p.flagHabilitado);
      setProveedores(habilitados);
    } catch (error) {
      console.error("Error al cargar proveedores:", error.message);
      setProveedores([]);
    }
  };

  const handleCancelar = () => {
    setSeleccionado(null);
    setProveedor("");
    setEmail("");
    setTelefono("");
    navigate("/");
  };

  const handleSelect = (p) => {
    setSeleccionado(p);
    setProveedor(p?.proveedor || "");
    setEmail(p?.email || "");
    setTelefono(p?.telefono || "");
  };

  const editarProveedor = async () => {
    const proveedorNormalizado = proveedor.trim().toUpperCase();
    const emailNormalizado = email.trim().toUpperCase();
    const telefonoNormalizado = telefono.trim();

    if (!validarEmail(emailNormalizado)) {
      addToast("❌ Ingresá un correo electrónico válido", "danger");
      return;
    }

    try {
      await axios.put(`${proveedoresUrl}/${seleccionado.id}`, {
        proveedor: proveedorNormalizado,
        email: emailNormalizado,
        telefono: telefonoNormalizado,
      });
      addToast("✅ Proveedor actualizado correctamente", "success");
      handleCancelar();
      await cargarProveedores();
    } catch (error) {
      addToast("❌ Error al actualizar proveedor", "danger");
      console.error("Error al actualizar proveedor:", error.message);
    }
  };

  return {
    proveedores,
    seleccionado,
    email,
    telefono,
    setEmail,
    setTelefono,
    setSeleccionado,
    editarProveedor,
    handleCancelar,
    handleSelect,
  };
}
