import { useBajoStockRepuestosForm } from "./hooks/useStockBajoRepuestosForm";
import { generarPdfBajoStockRepuestos } from "./helpers/PdfBajoStockRepuestos.js";

export default function StockBajoRepuestos() {
  const { data, loading } = useBajoStockRepuestosForm();

  if (loading) {
    return <div className="p-6 text-gray-500">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">
          Repuestos con stock bajo el mínimo
        </h1>

        <button
          onClick={() => generarPdfBajoStockRepuestos(data)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Descargar PDF
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Repuetos</th>
            <th className="border p-2 text-center">Stock actual</th>
            <th className="border p-2 text-center text-red-500">Stock mínimo</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) &&
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border p-2 text-center ">{item.nombre}</td>
                <td className="border p-2 text-center ">{item.stock_actual}</td>
                <td className="border p-2 text-center text-red-500">{item.stock_minimo}</td>
              </tr>
            ))}

          {/* También actualiza la verificación de si está vacío para mayor seguridad */}
          {Array.isArray(data) && data.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No hay repuestos por debajo del stock mínimo
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
