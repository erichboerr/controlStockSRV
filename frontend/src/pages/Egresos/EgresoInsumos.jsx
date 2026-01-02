import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import useEgresoInsumosForm from "./hooks/useEgresoInsumosForm.js";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";

export default function EgresoInsumos() {
  const {
    servicios,
    servicioSeleccionado,
    setServicioSeleccionado,
    marcas,
    marcaSeleccionada,
    setMarcaSeleccionada,
    modelosMap,
    modeloSeleccionado,
    setModeloSeleccionado,
    insumos,
    insumoSeleccionado,
    setInsumoSeleccionado,
    cantidad,
    setCantidad,
    listaEgreso,
    handleAgregar,
    handleEliminar,
    handleCancelar,
    handleSubmit,
    showConfirmPrint,
    confirmarImpresion,
    cerrarModalImpresion,
    enviando,
  } = useEgresoInsumosForm();

  return (
    <FormularioMarco titulo="Entrega de insumos a servicio">
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

        {/* Marca */}
        <SelectGeneric
          generic={marcas}
          value="Seleccionar marca"
          seleccionado={marcaSeleccionada}
          setSeleccionado={setMarcaSeleccionada}
          icono="bi-printer"
          labelKey="marca"
        />

        {/* Modelo */}
        {marcaSeleccionada && (
          <SelectGeneric
            generic={modelosMap[marcaSeleccionada.id] || []}
            value="Seleccionar modelo"
            seleccionado={modeloSeleccionado}
            setSeleccionado={setModeloSeleccionado}
            icono="bi-box"
            labelKey="modelo"
          />
        )}

        {/* Insumo + Cantidad */}
        {modeloSeleccionado && (
          <>
            <SelectGeneric
              key={insumoSeleccionado ? insumoSeleccionado.id : "reset"}
              generic={insumos}
              value="Seleccionar insumo"
              seleccionado={insumoSeleccionado}
              setSeleccionado={setInsumoSeleccionado}
              icono="bi-droplet"
              labelKey="insumo"
            />

            <InputGeneric
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Cantidad"
              icono="bi-hash"
            />

            {/* Lista de egreso */}
            {listaEgreso.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Lista de egreso</h5>

                <ul className="space-y-2">
                  {listaEgreso.map((item) => (
                    <li
                      key={item.idInsumo}
                      className="
                        flex justify-between items-center
                        bg-white border border-gray-300 rounded-md
                        px-3 py-2 shadow-sm
                      "
                    >
                      <span>
                        {item.insumo} — Cantidad: {item.cantidad}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleEliminar(item.idInsumo)}
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
              disabled={!insumoSeleccionado || !cantidad}
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
