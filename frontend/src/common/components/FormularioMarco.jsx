export default function FormularioMarco({ titulo, descripcion, children }) {
  return (
    <div className="pt-6 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg border border-gray-200">

        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-semibold text-lg">{titulo}</h2>

          {descripcion && (
            <p className="text-blue-100 text-sm mt-1">
              {descripcion}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}