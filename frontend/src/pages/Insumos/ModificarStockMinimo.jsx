import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import useModificarStockMinimo from "./hooks/useModificarStockMinimo.js";

export default function ModificarStockMinimo() {
  const {
    insumos,
    seleccionado,
    setSeleccionado,
    nuevoMinimo,
    setNuevoMinimo,
    guardar,
    handleCancelar,
  } = useModificarStockMinimo();

  return (
    <FormularioMarco titulo="Modificar Stock Mínimo">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="space-y-4">
          <SelectGeneric
            generic={insumos}
            value="Seleccione un insumo"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            labelKey="insumo"
            icono="bi-droplet"
          />

          {seleccionado && (
            <div className="p-3 border rounded bg-gray-50">
              <p>
                <strong>Stock actual:</strong>{" "}
                {seleccionado.stock_actual ?? "—"}
              </p>
              <p>
                <strong>Stock mínimo actual:</strong>{" "}
                {seleccionado.stock_minimo}
              </p>
            </div>
          )}

          <InputGeneric
            value={nuevoMinimo}
            onChange={(e) => setNuevoMinimo(e.target.value)}
            placeholder="Nuevo stock mínimo"
            type="number"
          />

          <div className="flex justify-between mt-4">
            <Button variant="secondary" type="button" onClick={handleCancelar}>
              Cerrar
            </Button>

            <Button variant="primary" onClick={guardar}>
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </FormularioMarco>
  );
}
