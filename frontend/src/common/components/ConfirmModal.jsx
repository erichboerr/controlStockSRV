export default function ConfirmModal({
  show,
  onHide,
  onConfirm,
  titulo = "Confirmar acción",
  mensaje,
  textoConfirmar = "Confirmar",
  varianteConfirmar = "primary",
}) {
  if (!show) return null;

  const variantes = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Contenedor */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <i className="bi bi-question-circle text-blue-600"></i>
            {titulo}
          </h2>

          <button
            onClick={onHide}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 text-gray-700">{mensaje}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t">
          <button
            onClick={onHide}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md ${variantes[varianteConfirmar]}`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}