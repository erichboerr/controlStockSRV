import FormularioMarco from '../../common/components/FormularioMarco.jsx';
import SelectGeneric from '../../common/components/SelectGeneric.jsx';
import Button from '../../common/components/Button.jsx';
import useListarServiciosPorModelo from './hooks/useListarServiciosPorModelo.jsx';

export default function ListarServiciosPorModelo() {
  const {
    marca,
    modelo,
    marcas,
    modelos,
    servicios,
    setMarca,
    setModelo,
    handleCancelar,
  } = useListarServiciosPorModelo();

  return (
    <FormularioMarco
      titulo="Servicios por modelo de impresora"
      descripcion="Seleccione una marca y modelo para ver los servicios asociados."
    >
      <form className="space-y-6">
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

        {/* Listado de servicios */}
        {modelo?.id && servicios.length > 0 ? (
          <div className="space-y-2">
            {servicios.map((srv) => (
              <div
                key={srv.id}
                className="p-2 border rounded bg-gray-50 flex items-center"
              >
                <i className="bi-building mr-2 text-gray-600"></i>
                <span>{srv.servicio}</span>
              </div>
            ))}
          </div>
        ) : modelo?.id ? (
          <div className="text-gray-500 text-sm">
            No hay servicios asociados a este modelo.
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            Seleccione marca y modelo para ver servicios.
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
