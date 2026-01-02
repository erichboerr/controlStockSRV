import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useAgregarMarcasForm from "./hooks/useAgregarMarcasForm.js";

export default function AgregarMarca() {
  const { marca, setMarca, agregarMarca, handleCancelar } =
    useAgregarMarcasForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarMarca();
  };

  return (
    <FormularioMarco titulo="Agregar Marca" descripcion="Agregar nueva marca">
      <form onSubmit={handleSubmit}>
        <InputGeneric
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          requerido={true}
          placeholder="Agregar marca"
          icono="bi-list-check"
        />

        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button variant="primary" type="submit" disabled={!marca.trim()}>
            Agregar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
