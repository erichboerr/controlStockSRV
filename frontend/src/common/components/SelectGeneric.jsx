export default function SelectGeneric({
  generic = [],
  value = "Seleccionar opción",
  seleccionado,
  setSeleccionado,
  onSelect,
  mostrarSoloHabilitados = true,
  icono = "bi-list-check",
  disabled = false,
  className = "",
  labelKey = "nombre",
  noMargin = false, // ✅ nueva prop
}) {
  const opciones = mostrarSoloHabilitados
    ? generic.filter((s) => s.flagHabilitado === true)
    : generic;

  const handleChange = (e) => {
    const id = parseInt(e.target.value);
    const seleccionado = opciones.find((s) => s.id === id) || null;
    setSeleccionado(seleccionado);
    if (onSelect) onSelect(seleccionado);
  };

  return (
    <div className={`${noMargin ? "" : "mb-4"} ${className}`}>
      <div
        className={`
          flex items-center rounded-lg border 
          ${disabled ? "bg-gray-100 border-gray-300" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500
        `}
      >
        <span className="px-3 text-gray-500">
          <i className={`bi ${icono}`}></i>
        </span>

        <select
          className={`
            w-full px-3 py-2 rounded-r-lg outline-none bg-white
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
          `}
          value={seleccionado?.id || ""}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">{value}</option>
          {opciones.map((s) => (
            <option key={s.id} value={s.id}>
              {s[labelKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}