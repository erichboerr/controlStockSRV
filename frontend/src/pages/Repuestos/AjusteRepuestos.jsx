import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import InputGeneric from "../../common/components/InputGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import useAjusteRepuestosForm from "./hooks/useAjusteRepuestosForm.js";

export default function AjusteRepuestos() {
  const {
    repuestos,
    repuestoSeleccionado,
    setrepuestoSeleccionado,
    cantidad,
    setCantidad,
    listaEgreso,
    handleAgregar,
    handleEliminar,
    handleCancelar,
    handleRestar,
    handleSumar,
    accion,
    setAccion,
    enviando,
  } = useAjusteRepuestosForm();

  return (
    <FormularioMarco titulo="Ajuste de Repuestos">
      <form className="space-y-4">
        <>
          <SelectGeneric
            generic={repuestos}
            value="Seleccionar Repuesto"
            seleccionado={repuestoSeleccionado}
            setSeleccionado={setrepuestoSeleccionado}
            icono="bi-gear"
            labelKey="repuesto"
          />

          <InputGeneric
            tipo="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad"
            icono="bi-hash"
          />
 
          {/* Selector de acción */}
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accion"
                value="sumar"
                checked={accion === "sumar"}
                onChange={() => setAccion("sumar")}
                disabled={listaEgreso.length > 0} // desactiva si ya hay ítems
              />
              Agregar (Sumar)
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accion"
                value="restar"
                checked={accion === "restar"}
                onChange={() => setAccion("restar")}
                disabled={listaEgreso.length > 0} // desactiva si ya hay ítems
              />
              Quitar (Restar)
            </label>
          </div>

          {/* Previsualización */}
          {listaEgreso.length > 0 && (
            <div className="mb-4 border rounded-md p-3 bg-gray-50">
              <h5 className="font-semibold mb-2 text-blue-600">
                Previsualización del ajuste (
                {accion === "sumar" ? "Ingreso" : "Egreso"}):
              </h5>
              <ul className="space-y-1 text-sm text-gray-700">
                {listaEgreso.map((item) => {
                  const final =
                    accion === "sumar"
                      ? item.stockActual + item.cantidad
                      : item.stockActual - item.cantidad;
                  return (
                    <li key={item.idInsumo}>
                      {item.insumo} — Stock actual: {item.stockActual} |{" "}
                      {accion === "sumar" ? "➕" : "➖"} {item.cantidad} →{" "}
                      <span className="font-semibold">Final: {final}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 font-semibold">
                Total ítems: {listaEgreso.length}
              </div>
            </div>
          )}

          {/* Lista de egreso */}
          {listaEgreso.length > 0 && (
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Lista de egreso</h5>
              <ul className="space-y-2">
                {listaEgreso.map((item) => (
                  <li
                    key={item.idInsumo}
                    className="flex justify-between items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm"
                  >
                    <span>
                      {item.insumo} — Cantidad: {item.cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEliminar(item.idInsumo)}
                      className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition"
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
            disabled={!repuestoSeleccionado || !cantidad}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Agregar
          </button>
        </>

        {/* Botones finales */}
        <div className="flex justify-between pt-4">
          <Button variant="secondary" type="button" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            variant={accion === "sumar" ? "warning" : "danger"}
            type="button"
            disabled={
              (listaEgreso.length === 0 &&
                (!repuestoSeleccionado || !cantidad)) ||
              enviando
            }
            onClick={accion === "sumar" ? handleSumar : handleRestar}
          >
            {accion === "sumar" ? "Sumar" : "Restar"}
          </Button>
        </div>
      </form>
    </FormularioMarco>
  );
}
