import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import useCambioSerieImpresoraForm from "./hooks/useCambioSerieImpresoraForm.jsx";

export default function CambioSerieImpresora() {
  const {
    servicio,
    marca,
    modelo,
    serie,
    newSerie,
    servicios,
    marcas,
    modelos,
    series,
    setServicio,
    setMarca,
    setModelo,
    setSerie,
    setNewSerie,
    handleCancelar,
    cambioSerie,
  } = useCambioSerieImpresoraForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    cambioSerie();
  };

  return (
    <FormularioMarco
      titulo="Entregar Impresora al servicio"
      descripcion="Complete los datos de la impresora entregada al servicio."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Servicio */}
        <SelectGeneric
          generic={servicios}
          value="Seleccionar servicio"
          seleccionado={servicio}
          setSeleccionado={setServicio}
          icono="bi-building"
          labelKey="servicio"
        />

        {/* Select Marca */}
        {marcas.length === 0 ? (
          <div className="text-gray-500 text-sm">
            Seleccione el servicio para ver impresoras disponibles para entregar
          </div>
        ) : (
          <>
            {/* Select Marca */}
            <SelectGeneric
              generic={marcas}
              value="Seleccionar marca"
              seleccionado={marca}
              setSeleccionado={setMarca}
              icono="bi-list-check"
              labelKey="marca"
            />

            {/* Select Modelo */}
            <SelectGeneric
              generic={modelos}
              value="Seleccionar modelo"
              seleccionado={modelo}
              setSeleccionado={setModelo}
              icono="bi-layers"
              labelKey="modelo"
              disabled={!marca?.id || modelos.length === 0}
            />

            {/* Select Serie */}
            <SelectGeneric
              generic={series}
              valueKey="id" // 👈 clave para el value
              labelKey="numeroSerie" // 👈 clave para mostrar
              seleccionado={serie}
              setSeleccionado={setSerie}
              value="Seleccionar serie"
              icono="bi-upc-scan"
              disabled={!modelo?.id || series.length === 0}
              mostrarSoloHabilitados={false}
            />
            {/* Input Serie */}
            <InputGeneric
              placeholder="Nueva serie"
              value={newSerie}
              onChange={(e) => setNewSerie(e.target.value.toUpperCase())}
               disabled={ series.length === 0}
              icono="bi-upc-scan"
            />
          </>
        )}

        {/* Botones */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={!servicio?.id || !serie?.id}
          >
            Cambiar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
