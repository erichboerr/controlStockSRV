export function validateFormData(formData) {
  const camposIncompletos = Object.entries(formData)
    .filter(([, value]) => !value.trim())
    .map(([key]) => key);

  const errores = [];

  if (formData.password && formData.password.length < 6) {
    errores.push("La contraseña debe tener al menos 6 caracteres");
  }

  if (camposIncompletos.length > 0) {
    errores.push(`Faltan completar: ${camposIncompletos.join(", ")}`);
  }

  return errores;
}
