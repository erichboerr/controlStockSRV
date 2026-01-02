import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button";
import useEditarServicioForm from "./hooks/useEditarServicioForm.js";

export default function EditarServicio() {
  const {
    servicios,
    seleccionado,
    setSeleccionado,
    servicio,
    setServicio,
    editarServicio,
    handleCancelar,
  } = useEditarServicioForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    editarServicio();
  };

  return (
    <FormularioMarco titulo="Editar Servicio">
      <form onSubmit={handleSubmit}>
        {servicios.length === 0 ? (
          <div className="text-muted">No hay servicios cargados</div>
        ) : (
          <SelectGeneric
            value="Seleccionar servicio"
            generic={servicios}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            icono="bi bi-list-check"
            className="col-md-6"
            labelKey="servicio"
          />
        )}

        <InputGeneric
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          requerido={true}
          placeholder="Nombre de servicio"
          icono="bi-pencil"
        />
        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={!seleccionado}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Guardar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
