import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { proveedoresUrl } from "../../../config/env.js";
import { validarEmail } from "../../../common/helpers/validarEmail.js";
import { useToast } from "../../../common/hooks/useToast.js";

export default function useAltaProveedoresForm() {
  const proveedores = [];
  const [proveedor, setProveedor] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleCancelar = () => {
    setProveedor("");
    setEmail("");
    setTelefono("");
    navigate("/");
  };

  const existeProveedor = (emailNormalizado, excluirId = null) => {
    return proveedores.some(
      (p) =>
        p.email.trim().toUpperCase() === emailNormalizado && p.id !== excluirId
    );
  };

  const agregarProveedor = async () => {
    const proveedorNormalizado = proveedor.trim().toUpperCase();
    const emailNormalizado = email.trim().toUpperCase();
    const telefonoNormalizado = telefono.trim();

    if (!validarEmail(emailNormalizado)) {
      addToast("❌ Ingresá un correo electrónico válido", "danger");
      return;
    }

    if (existeProveedor(emailNormalizado)) {
      addToast("⚠️ Ya existe un proveedor con ese email", "warning");
      return;
    }

    try {
      await axios.post(proveedoresUrl, {
        proveedor: proveedorNormalizado,
        email: emailNormalizado,
        telefono: telefonoNormalizado,
      });
      addToast("✅ Proveedor agregado correctamente", "success");
      handleCancelar();
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "❌ Error al agregar proveedor";
      addToast(msg, "danger");
    }
  };

  return {
    proveedor,
    email,
    telefono,
    setProveedor,
    setEmail,
    setTelefono,
    handleCancelar,
    agregarProveedor,
  };
}
