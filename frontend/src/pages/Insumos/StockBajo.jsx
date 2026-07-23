import { useState } from "react";
import { useBajoStock } from "./hooks/useBajoStock.js";
import { useFiltroStockInsumos } from "./hooks/useFiltroStockInsumos.js";
import { generarPdfBajoStock } from "./utils/PdfBajoStock.js";

export default function StockBajo() {
  const [marcaId, setMarcaId] = useState("");
  const [modeloId, setModeloId] = useState("");
  const [insumoId, setInsumoId] = useState("");

  const { data, loading } = useBajoStock({ marcaId, modeloId, insumoId });
  const { marcas, modelos, insumos } = useFiltroStockInsumos(marcaId);

  const hayFiltro = marcaId || modeloId || insumoId;

  const filtroDescripcion = hayFiltro
    ? [
        marcaId && `Marca: ${marcas.find((m) => String(m.id) === String(marcaId))?.marca ?? ""}`,
        modeloId && `Modelo: ${modelos.find((m) => String(m.id) === String(modeloId))?.modelo ?? ""}`,
        insumoId && `Insumo: ${insumos.find((i) => String(i.id) === String(insumoId))?.insumo ?? ""}`,
      ]
        .filter(Boolean)
        .join(" | ")
    : null;

  const limpiarFiltros = () => {
    setMarcaId("");
    setModeloId("");
    setInsumoId("");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">
          Insumos con stock bajo el mínimo
        </h1>

        <button
          onClick={() => generarPdfBajoStock(data, filtroDescripcion)}
          title="Descargar PDF"
          className="p-2 rounded-full text-red-600 hover:bg-red-50 transition"
        >
          <i className="bi bi-file-earmark-pdf-fill text-xl" />
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-end gap-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Marca</label>
          <select
            className="border rounded px-2 py-1.5 text-sm min-w-[160px]"
            value={marcaId}
            onChange={(e) => {
              setMarcaId(e.target.value);
              setModeloId(""); // al cambiar la marca, reseteo el modelo elegido
            }}
          >
            <option value="">Todas</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.marca}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Modelo</label>
          <select
            className="border rounded px-2 py-1.5 text-sm min-w-[160px]"
            value={modeloId}
            onChange={(e) => setModeloId(e.target.value)}
          >
            <option value="">Todos</option>
            {modelos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.modelo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Insumo</label>
          <select
            className="border rounded px-2 py-1.5 text-sm min-w-[160px]"
            value={insumoId}
            onChange={(e) => setInsumoId(e.target.value)}
          >
            <option value="">Todos</option>
            {insumos.map((i) => (
              <option key={i.id} value={i.id}>
                {i.insumo}
              </option>
            ))}
          </select>
        </div>

        {hayFiltro && (
          <button
            onClick={limpiarFiltros}
            className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-6 text-gray-500">Cargando...</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">Marca</th>
              <th className="border p-2 text-center">Modelo</th>
              <th className="border p-2 text-center">Insumo</th>
              <th className="border p-2 text-center">Stock actual</th>
              <th className="border p-2 text-center text-red-500">
                Stock mínimo
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(data) &&
              data.map((item, idx) => (
                <tr
                  key={`${item.insumoId}-${item.modeloId ?? "sin-modelo"}-${idx}`}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-2 text-center">
                    {item.marca ?? "-"}
                  </td>
                  <td className="border p-2 text-center">
                    {item.modelo ?? "-"}
                  </td>
                  <td className="border p-2 text-center">{item.insumo}</td>
                  <td className="border p-2 text-center">
                    {item.stock_actual}
                  </td>
                  <td className="border p-2 text-center text-red-500">
                    {item.stock_minimo}
                  </td>
                </tr>
              ))}

            {Array.isArray(data) && data.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No hay insumos por debajo del stock mínimo
                  {hayFiltro ? " con este filtro" : ""}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
