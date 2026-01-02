import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useResetearContraseñaForm from "./hooks/useResetearContraseñaForm.js";

export default function ResetearContraseña() {
  const {
    usuarios,
    usuarioSeleccionado,
    nuevaPassword,
    setNuevaPassword,
    handleUsuarioSelect,
    handleCancelar,
    handleSubmit,
  } = useResetearContraseñaForm();

  return (
    <FormularioMarco titulo="Resetear Contraseña de Usuario">
      <form onSubmit={handleSubmit}>
        <SelectGeneric
          generic={usuarios}
          value="Seleccione un usuario"
          seleccionado={usuarioSeleccionado}
          setSeleccionado={handleUsuarioSelect}
          onSelect={handleUsuarioSelect}
          icono="bi-person"
          labelKey="user"
        />

        {usuarioSeleccionado && (
          <div className="mt-2 mb-2">
            <strong>Se cambiará la contraseña a: </strong>
            <span className="text-danger fw-bold">
              {usuarioSeleccionado.user}
            </span>
          </div>
        )}

        {usuarioSeleccionado && (
          <div className="mb-3">
            <label className="form-label">Nueva contraseña</label>
            <InputGeneric
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              requerido={true}
              placeholder="Debe tener al menos seis caracteres"
              tipo="password"
              icono="bi-key"
            />
          </div>
        )}

         <div className="flex justify-between mt-4">
                  <Button variant="secondary" type="button" onClick={handleCancelar}>
                    Cerrar
                  </Button>
        
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!usuarioSeleccionado || nuevaPassword.length < 6}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Guardar
                  </Button>
                </div>
      </form>
    </FormularioMarco>
  );
}