import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";
import useAltaUsuarioForm from "./hooks/useAltaUsuarioForm.js";


export default function AgregarUsuario() {
  const {
    roles,
    rolSeleccionado,
    setRolSeleccionado,
    password,
    setPassword,
    nombre,
    setNombre,
    handleSubmit,
    handleCancelar,
    pendienteReactivar,
    confirmarReactivar,
    cancelarReactivar,
  } = useAltaUsuarioForm();

  return (
    <FormularioMarco titulo="Agregar Usuario">
      <form onSubmit={handleSubmit}>
        <InputGeneric
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          requerido={true}
          placeholder="Nombre del usuario"
        />
        <SelectGeneric
          generic={roles}
          value="Seleccione un rol"
          seleccionado={rolSeleccionado}
          setSeleccionado={setRolSeleccionado}
          icono="bi-person-badge"
          labelKey="rol"
        />
        <InputGeneric
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          requerido={true}
          placeholder="Contraseña"
          tipo="password"
          icono="bi-key"
        />
        
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!rolSeleccionado}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Agregar
          </Button>
        </div>
      </form>

      <ConfirmModal
        show={!!pendienteReactivar}
        onHide={cancelarReactivar}
        onConfirm={confirmarReactivar}
        titulo="Usuario dado de baja"
        mensaje={
          pendienteReactivar && (
            <>
              Ya existe el usuario <strong>{pendienteReactivar.nombre}</strong>,
              pero está dado de baja. ¿Querés reactivarlo con el rol y la
              contraseña que acabás de ingresar, en vez de crear uno nuevo?
            </>
          )
        }
        textoConfirmar="Reactivar"
        varianteConfirmar="success"
      />
    </FormularioMarco>
  );
}
