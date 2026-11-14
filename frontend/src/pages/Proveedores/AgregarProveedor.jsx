import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";
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
    pendienteReactivar,
    confirmarReactivar,
    cancelarReactivar,
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

      <ConfirmModal
        show={!!pendienteReactivar}
        onHide={cancelarReactivar}
        onConfirm={confirmarReactivar}
        titulo="Proveedor dado de baja"
        mensaje={
          pendienteReactivar && (
            <>
              Ya existe el proveedor{" "}
              <strong>{pendienteReactivar.nombre}</strong>, pero está dado de
              baja. ¿Querés reactivarlo en vez de crear uno nuevo?
            </>
          )
        }
        textoConfirmar="Reactivar"
        varianteConfirmar="success"
      />
    </FormularioMarco>
  );
}
