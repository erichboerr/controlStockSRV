import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useAltaProveedoresForm from "./hooks/useAltaProveedoresForm.js";

export default function AgregarProveedor() {
  const {
    proveedor,
    email,
    telefono,
    setProveedor,
    setEmail,
    setTelefono,
    handleCancelar,
    agregarProveedor,
  } = useAltaProveedoresForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarProveedor();
  };

  return (
    <FormularioMarco titulo="Agregar Proveedor">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <InputGeneric
              requerido
              placeholder="Razón Social"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              icono="bi bi-person"
            />
          </div>

          <div className="col-12">
            <InputGeneric
               requerido={false}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tipo="email"
              icono="bi bi-envelope"
            />
          </div>

          <div className="col-12">
            <InputGeneric
              requerido={false}
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              tipo="text"
              icono="bi bi-telephone"
            />
          </div>
          
          {/* Botones */}

          <div className="flex justify-between mt-4">
            <Button variant="secondary" type="button" onClick={handleCancelar}>
              Cerrar
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={!proveedor.trim() }
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Agregar
            </Button>
          </div>
        </div>
      </form>
    </FormularioMarco>
  );
}
