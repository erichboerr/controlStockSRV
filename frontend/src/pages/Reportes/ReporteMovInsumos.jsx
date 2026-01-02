import dayjs from "dayjs";
import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import { useReporteMovInsumos } from "./hooks/useReporteMovInsumos.js";

export default function ReporteMovInsumos() {
  const {
    desde,
    hasta,
    insumos,
    movimientos,
    loading,
    setDesde,
    setHasta,
    seleccionado,
    setSeleccionado,
    buscar,
    limpiar
  } = useReporteMovInsumos();

  const handleSubmit = (e) => {
    e.preventDefault();
    buscar();
  };

  return (
    <FormularioMarco titulo="Reporte de Movimientos por Insumo">
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
            <label className="block text-sm font-medium mb-1">Insumos</label>
            <SelectGeneric
              value="Seleccionar Insumo"
              generic={insumos}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              icono="bi bi-list-check"
              labelKey="insumo"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button
            variant="secondary"
            type="button" // 👈 importante: no usar "reset"
            onClick={limpiar}
          >
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

  // 👉 Calcular stock actual: ingresos suman, egresos restan
  const stockActual = movimientos.reduce((acc, m) => {
    return acc + (m.tipo === "ingreso" ? m.cantidad : -m.cantidad);
  }, 0);

  return (
    <>
      {/* Leyenda antes de la tabla */}
      <div className="mb-2 font-semibold text-blue-600">
        <h2>Stock actual: {stockActual}</h2>
      </div>

      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Insumo</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Proveedor</th>
            <th className="p-2 border">Servicio</th>
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
              <td className="p-2 border">{m.proveedorInsumos?.proveedor ?? "-"}</td>
              <td className="p-2 border">{m.servicio?.servicio ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
