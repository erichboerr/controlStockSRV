export default function InputGeneric({
  value,
  onChange,
  requerido = false,
  placeholder = "",
  icono = "bi-pencil-square",
  tipo = "text",
  disabled = false,
}) {
  return (
    <div className="mb-4">
      <div
        className={`
          flex items-center rounded-lg border 
          ${disabled ? "bg-gray-100 border-gray-300" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500
        `}
      >
        {/* Icono */}
        <span className="px-3 text-gray-500">
          <i className={icono}></i>
        </span>

        {/* Input */}
        <input
          type={tipo}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={requerido}
          disabled={disabled}
          className={`
            w-full px-3 py-2 rounded-r-lg outline-none
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
          `}
        />
      </div>
    </div>
  );
}