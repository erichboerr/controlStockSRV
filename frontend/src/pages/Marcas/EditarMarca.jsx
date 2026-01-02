import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button";
import useEditarMarcaForm from "./hooks/useEditarMarcaForm.js";


export default function EditarMarca() {
  const {
    marcaSeleccionada,
    setMarcaSeleccionada,
    nuevoNombre,
    setNuevoNombre,
    marcas,
    handleCancelar,
    guardarMarca,
  } = useEditarMarcaForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarMarca();
  };

  return (
    <FormularioMarco titulo="Editar Marca">      
      {/* Formulario */}
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

        {/* Input Nuevo nombre */}
        <InputGeneric
          placeholder="Nuevo nombre de la marca"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          icono="bi bi-list-check"
        />

        {/* Botones */}
        <div className="flex justify-between pt-2">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="warning"
            type="submit"
            disabled={!marcaSeleccionada || !nuevoNombre.trim()}           
          >
            Guardar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
