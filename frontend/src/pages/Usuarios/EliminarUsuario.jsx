import ConfirmModal from "../../common/components/ConfirmModal.jsx";
import useEliminarUsuario from "./hooks/useEliminarUsuarioForm.js";
import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";

export default function EliminarUsuario() {
  const {
    usuarios,
    seleccionado,
    showConfirm,
    confirmarEliminacion,
    cancelarConfirmacion,
    eliminarUsuario,
    handleSelect,
    handleCancelar,
  } = useEliminarUsuario();

  return (
    <FormularioMarco titulo="Eliminar Usuario">
      <form onSubmit={(e) => e.preventDefault()}>
        {usuarios.length === 0 ? (
          <div className="text-muted">No hay usuarios cargados</div>
        ) : (
          <SelectGeneric
            value="Seleccionar usuario"
            generic={usuarios}
            seleccionado={seleccionado}
            setSeleccionado={handleSelect}
            onSelect={handleSelect}
            icono="bi bi-person-x"
            className="col-md-6"
            labelKey="user"
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
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={confirmarEliminacion}
          >
            Eliminar
          </Button>
        </div>
      </form>

      <ConfirmModal
        show={showConfirm}
        onHide={cancelarConfirmacion}
        onConfirm={eliminarUsuario}
        titulo="Confirmar eliminación"
        mensaje={
          <>
            ¿Estás seguro que querés eliminar al usuario{" "}
            <strong className="text-danger">{seleccionado?.user}</strong>? Esta
            acción no se puede deshacer.
          </>
        }
        textoConfirmar="Eliminar"
        varianteConfirmar="danger"
      />
    </FormularioMarco>
  );
}
