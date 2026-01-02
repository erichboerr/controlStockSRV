import dayjs from "dayjs";
import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import { useReporteIngresosPorProveedor } from "./hooks/useReporteIngresosPorProveedor.js";

export default function ReporteIngresosPorProveedor() {
  const {
    desde,
    hasta,
    proveedores,
    seleccionado,
    setSeleccionado,
    ingresos,
    loading,
    setDesde,
    setHasta,
    buscar,
    limpiar,
  } = useReporteIngresosPorProveedor();

  const handleSubmit = (e) => {
    e.preventDefault();
    buscar();
  };

  return (
    <FormularioMarco titulo="Reporte de Ingresos por proveedor">
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
            <label className="block text-sm font-medium mb-1">Proveedor</label>
            <SelectGeneric
              value="Seleccionar Proveedor"
              generic={proveedores}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              icono="bi bi-list-check"
              labelKey="proveedor"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="reset" onClick={limpiar}>
            Limpiar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!seleccionado}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Buscar ingresos
          </Button>
        </div>
        {/* Resultados */}
        <Resultados ingresos={ingresos} loading={loading} />
      </form>
    </FormularioMarco>
  );
}

function Resultados({ ingresos, loading }) {
  if (loading) return <div className="text-gray-600">Cargando ingresos…</div>;
  if (ingresos.length === 0)
    return (
      <div className="text-gray-500 border rounded p-4 bg-gray-50">
        No hay ingresos para los filtros seleccionados.
      </div>
    );

  // 👉 Agrupar por insumo y sumar cantidades
  const totalesPorInsumo = ingresos.reduce((acc, i) => {
    const insumo = i.insumo?.insumo ?? "Sin nombre";
    acc[insumo] = (acc[insumo] || 0) + i.cantidad;
    return acc;
  }, {});

  return (
    <>
      {/* Leyenda antes de la tabla */}
      <div className="mb-4">
        <h2 className="font-semibold text-blue-600">Totales de insumos entregados en el período:</h2>
        <ul className="list-disc list-inside text-gray-700">
          {Object.entries(totalesPorInsumo).map(([insumo, total]) => (
            <li key={insumo}>
              {insumo}: {total}
            </li>
          ))}
        </ul>
      </div>

      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Insumo</th>
            <th className="p-2 border">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((i) => (
            <tr key={i.id} className="odd:bg-gray-50">
              <td className="p-2 border">
                {dayjs(i.fecha).format("DD/MM/YYYY")}
              </td>
              <td className="p-2 border">{i.insumo?.insumo}</td>
              <td className="p-2 border">{i.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}