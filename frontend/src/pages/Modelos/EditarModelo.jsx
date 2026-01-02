import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button";
import useEditarModeloForm from "./hooks/useEditarModeloForm.js";

export default function EditarModelo() {
  const {
    modeloSeleccionado,
    setModeloSeleccionado,
    nuevoNombre,
    setNuevoNombre,
    modelos,
    handleCancelar,
    editarModelo,
  } = useEditarModeloForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    editarModelo();
  };

  return (
    <FormularioMarco titulo="Editar Modelo">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Modelo */}
        {modelos.length === 0 ? (
          <div className="text-gray-500 text-sm">No hay Modelos cargados</div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar modelo
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <i className="bi bi-layers"></i>
              </span>

              <select
                className="
                  w-full pl-10 pr-3 py-2 rounded-md border border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-white text-gray-700 shadow-sm
                "
                value={modeloSeleccionado?.id || ""}
                onChange={(e) => {
                  const seleccionado = modelos.find(
                    (m) => m.id === parseInt(e.target.value)
                  );
                  setModeloSeleccionado(seleccionado || null);
                }}
              >
                <option value="">Seleccionar modelo</option>
                {modelos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.modelo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Input Nuevo nombre */}
        <InputGeneric
          placeholder="Nuevo nombre del modelo"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          icono="bi bi-layers"
        />

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant="warning"
            type="submit"
            disabled={!modeloSeleccionado || !nuevoNombre.trim()}
          >
            Guardar
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
