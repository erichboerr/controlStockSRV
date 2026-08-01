export function createError(message, httpStatus, code, data) {
  const error = new Error(message);
  error.isCustom = true;
  error.httpStatus = httpStatus;
  error.code = code;
  // Carga extra opcional (ej: datos del registro existente dado de baja,
  // para que el frontend pueda ofrecer "¿querés reactivarlo?").
  if (data !== undefined) error.data = data;
  return error;
}
