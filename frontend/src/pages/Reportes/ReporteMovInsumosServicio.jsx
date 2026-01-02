import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import { useReporteMovInsumosServicio } from "./hooks/useReporteMovInsumosServicio.js";
import dayjs from "dayjs";

export default function ReporteMovimientos() {
  const {
    desde,
    hasta,
    servicios,
    movimientos,
    loading,
    setDesde,
    setHasta,
    seleccionado,
    setSeleccionado,
    buscar,
    limpiar,
  } = useReporteMovInsumosServicio();

  const handleSubmit = (e) => {
    e.preventDefault();
    buscar();
  };

  return (
    <FormularioMarco titulo="Reporte de Movimientos por Servicio">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Filtros */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Desde</label>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hasta</label>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Servicio</label>
            <SelectGeneric
              value="Seleccionar servicio"
              generic={servicios}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              icono="bi bi-list-check"
              labelKey="servicio"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-4 mb-6">
          <Button variant="secondary" type="button" onClick={limpiar}>
            Limpiar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!seleccionado}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Buscar movimientos
          </Button>
        </div>

        {/* Resultados */}
        <Resultados movimientos={movimientos} loading={loading} />
      </form>
    </FormularioMarco>
  );
}

function Resultados({ movimientos, loading }) {
  if (loading)
    return <div className="text-gray-600">Cargando movimientos…</div>;
  if (movimientos.length === 0)
    return (
      <div className="text-gray-500 border rounded p-4 bg-gray-50">
        No hay movimientos para los filtros seleccionados.
      </div>
    );

  // 👉 Calcular sumatoria de lo entregado (tipo = "egreso")
  const totalEntregado = movimientos.reduce((acc, m) => {
    return acc + (m.tipo === "egreso" ? m.cantidad : 0);
  }, 0);

  return (
    <>
      {/* Leyenda antes de la tabla */}
      <div className="mb-2 font-semibold text-red-600">
        Total entregado en el período: {totalEntregado}
      </div>

      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Insumo</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m) => (
            <tr key={m.id} className="odd:bg-gray-50">
              <td className="p-2 border">
                {dayjs(m.fecha).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">{m.insumo?.insumo}</td>
              <td className="p-2 border">{m.cantidad}</td>
              <td className="p-2 border">{m.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}