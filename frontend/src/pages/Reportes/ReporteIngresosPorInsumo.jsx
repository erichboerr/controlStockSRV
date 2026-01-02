import dayjs from "dayjs";
import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import { useReporteIngresosPorInsumo } from "./hooks/useReporteIngresosPorInsumo.js";

export default function ReporteIngresosPorInsumo() {
  const {
    desde,
    hasta,
    insumos,
    seleccionado,
    setSeleccionado,
    ingresos,
    loading,
    setDesde,
    setHasta,
    buscar,
    limpiar,
  } = useReporteIngresosPorInsumo();

  const handleSubmit = (e) => {
    e.preventDefault();
    buscar();
  };

  return (
    <FormularioMarco titulo="Reporte de Ingresos de Insumos">
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

  // 👉 Calcular total ingresado en el período
  const totalIngresado = ingresos.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <>
      {/* Leyenda antes de la tabla */}
      <div className="mb-2 font-semibold text-green-600">
        Total ingresado en el período: {totalIngresado}
      </div>

      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Insumo</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Proveedor</th>
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
              <td className="p-2 border">{i.proveedorInsumos?.proveedor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}