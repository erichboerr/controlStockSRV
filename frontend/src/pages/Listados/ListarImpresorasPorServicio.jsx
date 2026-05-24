import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import useListarImpresorasPorServicio from "./hooks/useListarImpresorasPorServicio.jsx";

export default function ListarImpresorasPorServicio() {
  const {
    servicio,
    servicios,
    impresoras,
    setServicio,
    handleCancelar,
  } = useListarImpresorasPorServicio();

  return (
    <FormularioMarco
      titulo="Impresoras por servicio"
      descripcion="Seleccione un servicio para ver las impresoras asociadas."
    >
      <form className="space-y-6">
        {/* Select Servicio */}
        <SelectGeneric
          generic={servicios}
          value="Seleccionar servicio"
          seleccionado={servicio}
          setSeleccionado={setServicio}
          icono="bi-building"
          labelKey="servicio"
          valueKey="id"
        />

        {/* Listado de impresoras */}
        {servicio?.id && impresoras.length > 0 ? (
          <div className="space-y-2">
            {impresoras.map((i) => (
              <div
                key={i.impresoraFisica.id}
                className="p-2 border rounded bg-gray-50 flex items-center"
              >
                <i className="bi-printer mr-2 text-gray-600"></i>
                <span>
                  {i.impresoraFisica.impresora?.marca?.marca}{" "}
                  {i.impresoraFisica.impresora?.modelo?.modelo}{" "} ( {"Serie: "} 
                  {i.impresoraFisica.numeroSerie})
                </span>
              </div>
            ))}
          </div>
        ) : servicio?.id ? (
          <div className="text-gray-500 text-sm">
            No hay impresoras asociadas a este servicio.
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            Seleccione un servicio para ver impresoras.
          </div>
        )}

        {/* Botón cerrar */}
        <div className="flex justify-end pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
