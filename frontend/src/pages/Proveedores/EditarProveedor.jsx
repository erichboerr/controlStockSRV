import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useEditarProveedoresForm from "./hooks/useEditarProveedoresForm.js";

export default function EditarProveedor() {
  const {
    proveedores,
    seleccionado,
    email,
    telefono,
    setEmail,
    setTelefono,
    setSeleccionado,
    editarProveedor,
    handleCancelar,
    handleSelect,
  } = useEditarProveedoresForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    editarProveedor();
  };

  return (
    <FormularioMarco titulo="Editar Proveedor">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            {proveedores.length === 0 ? (
              <div className="text-muted">No hay proveedores cargados</div>
            ) : (
              <SelectGeneric
                generic={proveedores}
                value="Seleccionar Proveedor"
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
                onSelect={handleSelect}
                icono="bi-list-check"
                labelKey="proveedor"
              />
            )}
          </div>

          <div className="col-md-12">
            <InputGeneric
              requerido
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tipo="email"
              icono="bi bi-envelope"
              disabled={!seleccionado}
            />
          </div>

          <div className="col-md-12">
            <InputGeneric
              requerido
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              tipo="text"
              icono="bi bi-telephone"
              disabled={!seleccionado}
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="secondary" type="button" onClick={handleCancelar}>
              Cerrar
            </Button>

            <Button
              variant="warning"
              type="submit"
              disabled={!seleccionado || !email.trim() || !telefono.trim()}
              
            >
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </FormularioMarco>
  );
}
