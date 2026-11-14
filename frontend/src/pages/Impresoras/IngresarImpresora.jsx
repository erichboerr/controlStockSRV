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
    series,
    remito,
    marcas,
    modelos,
    proveedores,
    setMarca,
    setModelo,
    setProveedor,
    agregarSerie,
    quitarSerie,
    actualizarSerie,
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

        {/* Números de serie (uno por unidad física) */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            Números de serie ({series.length})
          </label>

          {series.map((serie, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1 [&>div]:mb-0">
                <InputGeneric
                  placeholder={`Número de serie ${index + 1}`}
                  value={serie}
                  onChange={(e) => actualizarSerie(index, e.target.value)}
                  icono="bi-upc-scan"
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => quitarSerie(index)}
                disabled={series.length === 1}
                title="Quitar esta serie"
              >
                <i className="bi bi-dash-lg" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={agregarSerie}>
            <i className="bi bi-plus-lg" /> Agregar otra serie
          </Button>
        </div>

        {/* Botones */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={
              !marca?.id ||
              !modelo?.id ||
              !proveedor?.id ||
              series.every((s) => !s.trim())
            }
          >
            Ingresar {series.filter((s) => s.trim()).length > 1
              ? `(${series.filter((s) => s.trim()).length})`
              : ""}
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
