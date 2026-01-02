// Guarda el token en sessionStorage
export function guardarToken(token) {
  sessionStorage.setItem('token', token);
}

// Obtiene el token actual
export function getToken() {
  return sessionStorage.getItem('token');
}

// Elimina el token (logout)
export function eliminarToken() {
  sessionStorage.removeItem('token');
}

// Verifica si hay sesión activa
export function estaAutenticado() {
  const token = getToken();
  return !!token;
}