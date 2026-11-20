// ============================================================================
// pages/Impresoras/BajaImpresora.jsx
// Pantalla Impresoras → Baja Impresora (baja de la impresora lógica).
//
// Flujo:
//   1. Se elige marca → se habilita el modelo de esa marca.
//   2. Al elegir el modelo se habilita el botón "Baja".
//   3. Al presionar "Baja" el backend revisa si hay servicios con impresoras
//      de ese modelo:
//        - Si hay → se muestra la lista de servicios y qué hacer.
//        - Si no hay → se abre la confirmación (acción irreversible).
//
// Secciones del archivo:
//   1. Imports
//   2. Auxiliar: plural
//   3. Componente: selectores, aviso de servicios, botones y confirmación
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Imports
// ---------------------------------------------------------------------------
import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import SelectGeneric from "../../common/components/SelectGeneric.jsx";
import Button from "../../common/components/Button.jsx";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";
import useDarDeBajaImpresoraForm from "./hooks/useDarDeBajaImpresoraForm.jsx";

// ---------------------------------------------------------------------------
// 2. Auxiliar: devuelve "1 unidad" / "3 unidades"
// ---------------------------------------------------------------------------
const plural = (n, singular, pluralTxt) =>
  `${n} ${n === 1 ? singular : pluralTxt}`;

// ---------------------------------------------------------------------------
// 3. Componente
// ---------------------------------------------------------------------------
export default function BajaImpresora() {
  const {
    marca,
    modelo,
    marcas,
    modelos,
    previa,
    procesando,
    setMarca,
    setModelo,
    handleCancelar,
    showConfirm,
    solicitarConfirmacion,
    cancelarConfirmacion,
    confirmarBaja,
  } = useDarDeBajaImpresoraForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    solicitarConfirmacion();
  };

  // Hay servicios con impresoras de este modelo: la baja está bloqueada.
  const bloqueada = previa && !previa.puedeDarseDeBaja;

  // Insumos que se darían de baja y todavía tienen stock (para avisar).
  const insumosConStock = (previa?.insumos || []).filter((i) => i.stock > 0);

  return (
    <FormularioMarco
      titulo="Baja de impresora"
      descripcion="Seleccione la marca y el modelo de la impresora que desea dar de baja de forma definitiva."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Marca */}
        <SelectGeneric
          generic={marcas}
          value="Seleccionar marca"
          seleccionado={marca}
          setSeleccionado={setMarca}
          icono="bi-list-check"
          labelKey="marca"
        />

        {/* Select Modelo (se habilita al elegir la marca) */}
        <SelectGeneric
          generic={modelos}
          value="Seleccionar modelo"
          seleccionado={modelo}
          setSeleccionado={setModelo}
          icono="bi-layers"
          labelKey="modelo"
          disabled={!marca?.id || modelos.length === 0}
        />

        {/* Aviso cuando la marca elegida no tiene modelos habilitados */}
        {marca?.id && modelos.length === 0 && (
          <div className="text-gray-500 text-sm">
            Esta marca no tiene modelos habilitados.
          </div>
        )}

        {/* Servicios que impiden la baja */}
        {bloqueada && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-3">
            <p className="text-sm font-semibold text-red-700">
              <i className="bi bi-exclamation-triangle mr-2"></i>
              No se puede dar de baja {previa.marca} {previa.modelo}: hay
              impresoras asignadas a estos servicios.
            </p>

            <div className="space-y-2">
              {previa.servicios.map((srv) => (
                <div
                  key={srv.id}
                  className="p-2 border rounded bg-white flex items-center"
                >
                  <i className="bi bi-building mr-2 text-gray-600"></i>
                  <span className="flex-1">{srv.servicio}</span>
                  <span className="text-sm text-gray-500">
                    {plural(srv.cantidad, "impresora", "impresoras")}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm text-red-700">
              Debe retirar esas impresoras de esos servicios (Impresoras →
              Retirar Impresora) para poder dar de baja esta impresora de
              manera definitiva.
            </p>
          </div>
        )}

        {/* Botones: Cerrar a la izquierda, Baja a la derecha */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={handleCancelar}>
            Cerrar
          </Button>

          <Button
            type="submit"
            variant="danger"
            disabled={!modelo?.id || procesando}
          >
            Baja
          </Button>
        </div>
      </form>

      {/* Confirmación: detalle de lo que se va a dar de baja */}
      <ConfirmModal
        show={showConfirm}
        onHide={cancelarConfirmacion}
        onConfirm={confirmarBaja}
        titulo="Confirmar baja"
        mensaje={
          previa && (
            <div className="space-y-3 text-sm">
              <p>
                ¿Deseás dar de baja de forma definitiva la impresora{" "}
                <strong>
                  {previa.marca} {previa.modelo}
                </strong>
                ?
              </p>

              <p className="font-semibold text-red-600">
                Este paso es irreversible.
              </p>

              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Se dará de baja el modelo <strong>{previa.modelo}</strong>.
                </li>

                {previa.marcaQuedaVacia && (
                  <li>
                    Se dará de baja la marca <strong>{previa.marca}</strong>,
                    porque quedará sin modelos.
                  </li>
                )}

                {previa.unidadesEnDeposito > 0 && (
                  <li>
                    Se darán de baja{" "}
                    <strong>
                      {plural(previa.unidadesEnDeposito, "unidad", "unidades")}
                    </strong>{" "}
                    que están en depósito.
                  </li>
                )}

                {previa.insumos.length > 0 && (
                  <li>
                    Se darán de baja los insumos de este modelo:{" "}
                    <strong>{previa.insumos.map((i) => i.insumo).join(", ")}</strong>
                    .
                  </li>
                )}
              </ul>

              {/* Aviso: insumos que todavía tienen stock */}
              {insumosConStock.length > 0 && (
                <div className="rounded border border-yellow-300 bg-yellow-50 p-2 text-yellow-800">
                  <i className="bi bi-exclamation-triangle mr-2"></i>
                  Atención: estos insumos todavía tienen stock:{" "}
                  {insumosConStock
                    .map((i) => `${i.insumo} (${i.stock})`)
                    .join(", ")}
                  .
                </div>
              )}
            </div>
          )
        }
        textoConfirmar="Dar de baja"
        varianteConfirmar="danger"
      />
    </FormularioMarco>
  );
}
