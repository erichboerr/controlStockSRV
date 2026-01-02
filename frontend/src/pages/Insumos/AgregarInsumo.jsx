import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useAltaInsumosForm from "./hooks/useAltaInsumoForm.js";

export default function AgregarInsumo() {
  const {
    insumo,
    setInsumo,
    modelos,
    modeloSeleccionado,
    stockMinimo,
    setStockMinimo,
    setModeloSeleccionado,
    handleSubmit,
    handleCancelar,
  } = useAltaInsumosForm();

  return (
    <FormularioMarco titulo="Agregar Insumo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectGeneric
          generic={modelos}
          value="Seleccione un modelo"
          seleccionado={modeloSeleccionado}
          setSeleccionado={setModeloSeleccionado}
          icono="bi bi-layers"
          labelKey="modelo"
        />
        <InputGeneric
          value={insumo}
          onChange={(e) => setInsumo(e.target.value)}
          requerido={true}
          icono="bi bi-droplet"
          placeholder="Nombre del insumo"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Stock mínimo</label>

          <input
            type="number"
            min="0"
            className="border rounded px-3 py-2 w-full"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
          />

          <p className="text-xs text-gray-500 mt-1">
            Si no completás este campo, el stock mínimo será de 5 unidades.
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!modeloSeleccionado || !insumo.trim()}
          >
            Agregar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
