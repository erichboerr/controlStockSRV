import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import useRetirarImpresoraForm from "./hooks/useRetirarImpresoraForm.jsx";

export default function RetirarImpresora() {
  const {
    servicio,
    marca,
    modelo,
    serie,
    servicios,
    marcas,
    modelos,
    series,
    setServicio,
    setMarca,
    setModelo,
    setSerie,
    handleCancelar,
    retirarImpresora,
  } = useRetirarImpresoraForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    retirarImpresora();
  };

  return (
    <FormularioMarco
      titulo="Retirar Impresora del servicio"
      descripcion="Seleccione el servicio y la impresora que retirará del servicio."
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
            Seleccione el servicio de donde retirará la impresora
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
          </>
        )}

        {/* Botones */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            type="submit"
            variant="warning"
            disabled={!servicio?.id || !serie?.id}
          >
            Retirar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
