import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import useEgresoRepuestosForm from "./hooks/useEgresoRepuestosForm.js";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";

export default function EgresoRepuestos() {
  const {
    servicios,
    servicioSeleccionado,
    setServicioSeleccionado,
    repuestos,
    repuestosSeleccionado,
    setRepuestosSeleccionado,
    cantidad,
    setCantidad,
    listaEgreso,
    handleAgregar,
    handleEliminar,
    handleSubmit,
    handleCancelar,
    showConfirmPrint,
    confirmarImpresion,
    cerrarModalImpresion,
    enviando,
  } = useEgresoRepuestosForm();

  return (
    <FormularioMarco titulo="Entrega de repuestos al servicio">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Servicio */}
        <SelectGeneric
          generic={servicios}
          value="Seleccionar servicio"
          seleccionado={servicioSeleccionado}
          setSeleccionado={setServicioSeleccionado}
          icono="bi-list-check"
          labelKey="servicio"
        />

        {servicioSeleccionado && (
          <>
            <div className="flex gap-3 items-start">
              <SelectGeneric
                className="w-100" // ancho más largo para el select
                generic={repuestos}
                value="Seleccionar repuesto"
                seleccionado={repuestosSeleccionado}
                setSeleccionado={setRepuestosSeleccionado}
                labelKey="repuesto"
                icono="bi-gear"
              />

              <InputGeneric
                value={cantidad}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setCantidad(val);
                }}
                requerido={false}
                placeholder="Cantidad"
                tipo="number"
                icono="bi-hash"
                className="w-8" 
              />
            </div>

            {/* Lista de egreso */}
            {listaEgreso.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Lista de egreso</h5>

                <ul className="space-y-2">
                  {listaEgreso.map((item) => (
                    <li
                      key={item.repuestoId}
                      className="
                        flex justify-between items-center
                        bg-white border border-gray-300 rounded-md
                        px-3 py-2 shadow-sm
                      "
                    >
                      <span>
                        {item.repuesto} — Cantidad: {item.cantidad}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleEliminar(item.repuestoId)}
                        className="
                          bg-red-500 text-white text-sm px-3 py-1 rounded-md
                          hover:bg-red-600 transition
                        "
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Botón Agregar */}
            <button
              type="button"
              onClick={handleAgregar}
              disabled={!repuestosSeleccionado || !cantidad}
              className="
                mt-2 bg-blue-600 text-white px-4 py-2 rounded-md
                hover:bg-blue-700 transition
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              Agregar
            </button>
          </>
        )}

        {/* Botones finales */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleCancelar}
            className="
              bg-gray-500 text-white px-4 py-2 rounded-md
              hover:bg-gray-600 transition
            "
          >
            Cerrar
          </button>

          <button
            type="submit"
            disabled={servicioSeleccionado === null || enviando}
            className="
              bg-green-600 text-white px-4 py-2 rounded-md
              hover:bg-green-700 transition
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            Entregar
          </button>
        </div>

        {/* Modal de confirmación */}
        <ConfirmModal
          show={showConfirmPrint}
          onHide={cerrarModalImpresion}
          onConfirm={confirmarImpresion}
          titulo="Imprimir comprobante"
          mensaje="¿Deseás imprimir el comprobante del egreso?"
          textoConfirmar="Imprimir"
          varianteConfirmar="primary"
        />
      </form>
    </FormularioMarco>
  );
}
