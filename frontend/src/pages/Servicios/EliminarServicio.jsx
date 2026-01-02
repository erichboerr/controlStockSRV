import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import useEliminarServicioForm from "./hooks/useEliminarServicioForm.js";
import Button from "../../common/components/Button";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";

export default function EliminarServicio() {
  const {
    servicios,
    seleccionado,
    setSeleccionado,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    handleEliminar,
    handleCancelar,
  } = useEliminarServicioForm();

  return (
    <FormularioMarco titulo="Eliminar Servicio">
      <form onSubmit={(e) => e.preventDefault()}>
        {servicios.length === 0 ? (
          <div className="text-muted">No hay servicios cargados</div>
        ) : (
          <SelectGeneric
            value="Seleccionar servicio"
            generic={servicios}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            icono="bi bi-list-check"
            className="col-md-6"
            labelKey="servicio"
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
        onConfirm={handleEliminar}
        titulo="Confirmar eliminación"
        mensaje={
          <>
            ¿Estás seguro que querés eliminar el servicio{" "}
            <strong className="text-danger">{seleccionado?.servicio}</strong>?
            Esta acción no se puede deshacer.
          </>
        }
        textoConfirmar="Eliminar"
        varianteConfirmar="danger"
      />
    </FormularioMarco>
  );
}
