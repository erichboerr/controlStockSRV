import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";
import Button from "../../common/components/Button";
import useEliminarProveedoresForm from "./hooks/useEliminarProveedoresForm.js";

export default function EliminarProveedor() {
  const {
    proveedores,
    seleccionado,
    setSeleccionado,
    eliminarProveedor,
    handleCancelar,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
  } = useEliminarProveedoresForm();

  return (
    <FormularioMarco titulo="Eliminar Proveedor">
      <form onSubmit={(e) => e.preventDefault()}>
        {proveedores.length === 0 ? (
          <div className="text-muted">No hay proveedores cargados</div>
        ) : (
          <SelectGeneric
            generic={proveedores}
            value="Seleccionar Proveedor"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            icono="bi-list-check"
            labelKey="proveedor"
          />
        )}

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!seleccionado}
            onClick={confirmarEliminacion}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar
          </Button>
        </div>
      </form>

      <ConfirmModal
              show={showConfirm}
              onHide={cancelarConfirmacion}
              onConfirm={eliminarProveedor}
              titulo="Confirmar eliminación"
              mensaje={
                <>
                  ¿Estás seguro que querés eliminar al proveedor{" "}
                  <strong className="text-danger">{seleccionado?.proveedor}</strong>? Esta
                  acción no se puede deshacer.
                </>
              }
              textoConfirmar="Eliminar"
              varianteConfirmar="danger"
            />
    </FormularioMarco>
  );
}
