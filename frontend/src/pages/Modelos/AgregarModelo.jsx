import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button";
import useAgregarModeloForm from "./hooks/useAgregarModeloForm.js";

export default function AgregarModelo() {
  const {
    marcaSeleccionada,
    setMarcaSeleccionada,
    nuevoNombre,
    setNuevoNombre,
    marcas,
    handleCancelar,
    agregarModelo,
  } = useAgregarModeloForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarModelo();
  };

  return (
    <FormularioMarco titulo="Agregar Modelo">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Marca */}
        <div className="w-full">
          {marcas.length === 0 ? (
            <div className="text-gray-500 text-sm">No hay marcas cargadas</div>
          ) : (
            <SelectGeneric
              generic={marcas}
              value="Seleccionar marca"
              seleccionado={marcaSeleccionada}
              setSeleccionado={setMarcaSeleccionada}
              icono="bi-list-check"
              labelKey="marca"
            />
          )}
        </div>

        {/* Input Nuevo Modelo */}
        <InputGeneric
          placeholder="Nuevo Modelo"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          icono="bi bi-layers"
        />

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button variant="primary" type="submit" disabled={!marcaSeleccionada || !nuevoNombre.trim() }>
            Agregar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
