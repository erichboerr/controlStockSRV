import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import useEditarUsuario from "./hooks/useEditarUsuarioForm.js";
import Button from "../../common/components/Button.jsx";

export default function EditarUsuario() {
  const {
    usuarios,
    roles,
    usuarioSeleccionado,
    rolSeleccionado,
    handleUsuarioSelect,
    handleRolSelect,
    handleCancelar,
    handleSubmit,
  } = useEditarUsuario();

  return (
    <FormularioMarco titulo="Editar Rol de Usuario">
      <form onSubmit={handleSubmit}>
        <SelectGeneric
          generic={usuarios}
          value="Seleccione un usuario"
          seleccionado={usuarioSeleccionado}
          setSeleccionado={handleUsuarioSelect}
          icono="bi-person"
          labelKey="user"
        />

        {usuarioSeleccionado && (
          <div className="mt-2 mb-2">
            <strong>Rol actual:</strong>{" "}
            {roles.find((r) => r.id === usuarioSeleccionado.rolId)?.rol ||
              "Sin rol"}
          </div>
        )}

        <SelectGeneric
          generic={roles}
          value="Seleccione nuevo rol"
          seleccionado={rolSeleccionado}
          setSeleccionado={handleRolSelect}
          icono="bi-person-badge"
          labelKey="rol"
        />

        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!usuarioSeleccionado || !rolSeleccionado}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Guardar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
