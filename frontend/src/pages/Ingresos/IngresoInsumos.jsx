import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useIngresoForm from "./hooks/useIngresoForm.js";

export default function IngresoInsumos() {
  const {
    proveedores,
    proveedorSeleccionado,
    setProveedorSeleccionado,
    insumos,
    insumoSeleccionado,
    setInsumoSeleccionado,
    remito,
    setRemito,
    cantidad,
    setCantidad,
    items,
    agregarItem,
    handleSubmit,
    handleCancelar,
  } = useIngresoForm();

  return (
    <FormularioMarco titulo="Ingreso de Mercadería">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Proveedor */}
        <SelectGeneric
          generic={proveedores}
          value="Seleccionar proveedor"
          seleccionado={proveedorSeleccionado}
          setSeleccionado={setProveedorSeleccionado}
          icono="bi-truck"
          labelKey="proveedor"
        />

        {/* Remito */}
        <InputGeneric
          value={remito}
          onChange={(e) => setRemito(e.target.value)}
          requerido={true}
          placeholder="N° Remito"
          icono="bi-receipt"
        />

        {/* Insumo + Cantidad */}
        <div className="flex gap-3 items-start">
          <SelectGeneric
            generic={insumos}
            value="Seleccionar insumo"
            seleccionado={insumoSeleccionado}
            setSeleccionado={setInsumoSeleccionado}
            labelKey="insumo"
            icono="bi-droplet"
          />

          <InputGeneric
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            requerido={true}
            placeholder="Cantidad"
            tipo="number"
            icono="bi-hash"
          />

          {/* Botón + */}
          <button
            type="button"
            onClick={agregarItem}
            disabled={!insumoSeleccionado || !cantidad}
            className="
              w-8 h-8 mt-1 flex items-center justify-center
              rounded-md bg-sky-500 text-white font-bold
              hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed
              shadow-sm transition
            "
          >
            +
          </button>
        </div>

        {/* Tabla temporal */}
        {items.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border-b text-left font-semibold">Insumo</th>
                  <th className="px-3 py-2 border-b text-left font-semibold">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-2 border-b">{it.descripcion}</td>
                    <td className="px-3 py-2 border-b">{it.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-between pt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={
              !proveedorSeleccionado ||
              !remito ||
              (items.length === 0 && (!insumoSeleccionado || !cantidad))
            }
          >
            Ingresar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}