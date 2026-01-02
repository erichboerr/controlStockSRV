export function normalizeUser(raw) {
  return raw?.trim().toLowerCase(); // asegura comparación e inserción consistentes
}
