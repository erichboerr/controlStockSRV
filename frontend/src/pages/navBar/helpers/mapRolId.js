export function mapRolIdToKey(rolId) {
  const map = {
    1: "admin",
    2: "administrativo",
    3: "tecnico",
  };
  return map[rolId] || "tecnico";
}