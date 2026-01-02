import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";

import Button from "../../common/components/Button";
import useAgregarRepuestosForm from "./hooks/useAgregarRepuestoForm.js";

export default function AgregarRepuesto() {
  const {
    repuesto,
    setRepuesto,
    stockMinimo,
    setStockMinimo,
    handleSubmit,
    handleCancelar,
  } = useAgregarRepuestosForm();

  return (
    <FormularioMarco titulo="Agregar Repuesto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputGeneric
          value={repuesto}
          onChange={(e) => setRepuesto(e.target.value.toUpperCase())}
          requerido={true}
          placeholder="Nombre del repuesto"
          icono="bi-gear"
        />

        <div className="mb-4">
          <InputGeneric
            tipo="number"
            min="0"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
            requerido={true}
            placeholder="Stock mínimo"
            icono="bi-pencil-fill"
          />

          <p className="text-xs text-gray-500 mt-1 ml-2">
           <strong>Si no completás este campo, el stock mínimo será de 3 unidades.</strong> 
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button variant="primary" type="submit" disabled={!repuesto.trim()}>
            Agregar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
