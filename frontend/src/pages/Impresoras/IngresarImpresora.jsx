import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import useIngresarImpresoraForm from "./hooks/useIngresarImpresoraForm.jsx";

export default function IngresarImpresora() {
  const {
    marca,
    modelo,
    proveedor,
    serie,
    remito,
    marcas,
    modelos,
    proveedores,
    setMarca,
    setModelo,
    setProveedor,
    setSerie,
    setRemito,
    handleCancelar,
    IngresarImpresora,
  } = useIngresarImpresoraForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    IngresarImpresora();
  };

  return (
    <FormularioMarco
      titulo="Ingresar Impresora"
      descripcion="Complete los datos de la impresora entregada por el proveedor"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Proveedor */}
        <SelectGeneric
          generic={proveedores}
          value="Seleccionar proveedor"
          seleccionado={proveedor}
          setSeleccionado={setProveedor}
          icono="bi-truck"
          labelKey="proveedor"
        />

        {/* Input Remito */}
        <InputGeneric
          placeholder="Número de remito"
          value={remito}
          onChange={(e) => setRemito(e.target.value.toUpperCase())}
          icono="bi-receipt"
        />

        {/* Select Marca */}
        {marcas.length === 0 ? (
          <div className="text-gray-500 text-sm">No hay marcas cargadas</div>
        ) : (
          <SelectGeneric
            generic={marcas}
            value="Seleccionar marca"
            seleccionado={marca}
            setSeleccionado={setMarca}
            icono="bi-list-check"
            labelKey="marca"
          />
        )}

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

        {/* Input Serie */}
        <InputGeneric
          placeholder="Número de serie"
          value={serie}
          onChange={(e) => setSerie(e.target.value.toUpperCase())}
          icono="bi-upc-scan"
        />

        {/* Botones */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={
              !marca?.id || !modelo?.id || !proveedor?.id || !serie.trim()
            }
          >
            Ingresar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
