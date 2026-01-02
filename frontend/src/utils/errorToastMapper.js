// utils/errorToastMapper.js
export function mapErrorToToastType(status) {
  switch (status) {
    case 400: // Bad Request → validaciones
      return "warning";
    case 401: // Unauthorized
    case 403: // Forbidden
      return "error";
    case 404: // Not Found
      return "info";
    case 409: // Conflict → usuario ya existe
      return "error";
    case 500: // Internal Server Error
      return "error";
    default:
      return "info";
  }
}