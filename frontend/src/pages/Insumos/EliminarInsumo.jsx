import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import useEliminarInsumoForm from "./hooks/useEliminarInsumoForm.js";
import Button from "../../common/components/Button";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";

export default function EliminarInsumo() {
  const {
    insumos,
    modelos,
    modeloSeleccionado,
    setModeloSeleccionado,
    insumoSeleccionado,
    setInsumoSeleccionado,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    handleEliminar,
    handleCancelar,
  } = useEliminarInsumoForm();

  return (
    <FormularioMarco titulo="Eliminar Insumo del Modelo">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

        <SelectGeneric
          generic={modelos}
          value="Seleccione un modelo"
          seleccionado={modeloSeleccionado}
          setSeleccionado={setModeloSeleccionado}
          icono="bi-layers"
          labelKey="modelo"
        />

        <SelectGeneric
          generic={insumos}
          value="Seleccione el insumo a desasociar"
          seleccionado={insumoSeleccionado}
          setSeleccionado={setInsumoSeleccionado}
          icono="bi-droplet"
          labelKey="insumo"
        />

        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="danger"
            type="submit"
            disabled={!modeloSeleccionado || !insumoSeleccionado}
            onClick={confirmarEliminacion}
          >
            Eliminar
          </Button>
        </div>
      </form>

      <ConfirmModal
        show={showConfirm}
        onHide={cancelarConfirmacion}
        onConfirm={handleEliminar}
        entidad={insumoSeleccionado}
        tipo="insumo"
        campo="insumo"
      />
    </FormularioMarco>
  );
}