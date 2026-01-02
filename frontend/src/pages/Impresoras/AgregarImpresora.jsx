import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import useAgregarImpresoraForm from "./hooks/useAgregarImpresoraForm.jsx";
import ModalAgregarValor from "./components/ModalAgregarValor.jsx";

export default function AgregarImpresora() {
  const {
    marca,
    modelo,
    insumos,
    marcas,
    setInsumos,
    handleMarcaChange,
    handleModeloChange,
    handleCancelar,
    agregarImpresoraObjeto,
    showModalMarca,
    setShowModalMarca,
    agregarMarca,
    modeloExiste,
  } = useAgregarImpresoraForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarImpresoraObjeto();
  };

  return (
    <FormularioMarco
      titulo="Agregar Impresora"
      descripcion="Complete los datos de la impresora (genérica)"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Marca */}
        <div className="flex items-center gap-3">
          <div className="grow">
            {marcas.length === 0 ? (
              <div className="text-gray-500 text-sm">
                No hay marcas cargadas
              </div>
            ) : (
              <SelectGeneric
                generic={marcas}
                value="Seleccionar marca"
                seleccionado={marca}
                setSeleccionado={handleMarcaChange}
                icono="bi-list-check"
                labelKey="marca"
                noMargin={true}
              />
            )}
          </div>

          {/* Botón agregar marca */}
          <Button
            type="button"
            variant="primary"
            onClick={() => setShowModalMarca(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 flex items-center justify-center"
          >
            +
          </Button>
        </div>

        {/* Input Modelo */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Modelo</label>

          <div
            className={`
              flex items-center rounded-lg border 
              ${modeloExiste ? "border-red-500" : "border-gray-300"}
              focus-within:ring-2 focus-within:ring-blue-500
            `}
          >
            <span className="px-3 text-gray-500">
              <i className="bi bi-layers"></i>
            </span>

            <input
              type="text"
              placeholder="Ingresar modelo"
              value={modelo?.modelo || ""}
              onChange={(e) => handleModeloChange(e.target.value)}
              disabled={!marca?.id}
              className={`
                w-full px-3 py-2 rounded-r-lg outline-none
                ${!marca?.id ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
              `}
            />
          </div>

          {modeloExiste && (
            <p className="text-red-600 text-sm mt-1">
              Ya existe un modelo con ese nombre para la marca seleccionada
            </p>
          )}
        </div>

        {/* Insumos dinámicos */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Insumos
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Los insumos creados desde esta pantalla tendrán un stock mínimo
            inicial de 5 unidades.
          </p>
           <p className="text-xs text-gray-500 mb-2">
            Podra cambiar el mínimo desde: Ingreso y Entregas - Ajuste de Insumos
          </p>

          {insumos.map((insumo, index) => (
            <InputGeneric
              key={index}
              placeholder={`Insumo ${index + 1}`}
              value={insumo}
              onChange={(e) => {
                const nuevos = [...insumos];
                nuevos[index] = e.target.value.toUpperCase();
                setInsumos(nuevos);
              }}
              icono="bi-droplet"
            />
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() => setInsumos([...insumos, ""])}
            className="mt-2"
          >
            Agregar otro insumo
          </Button>
        </div>

        {/* Botones */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={
              !marca?.id ||
              !modelo?.modelo?.trim() ||
              insumos.every((i) => !i.trim())
            }
          >
            Agregar
          </Button>
        </div>
      </form>

      {/* Modal agregar marca */}
      <ModalAgregarValor
        visible={showModalMarca}
        label="Marca"
        onConfirm={agregarMarca}
        onClose={() => setShowModalMarca(false)}
      />
    </FormularioMarco>
  );
}
