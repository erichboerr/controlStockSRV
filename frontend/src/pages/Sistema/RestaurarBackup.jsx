import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import ConfirmModal from "../../common/components/ConfirmModal.jsx";
import useRestaurarBackupForm from "./hooks/useRestaurarBackupForm.jsx";

function formatearFecha(fechaIso) {
  const f = new Date(fechaIso);
  return f.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RestaurarBackup() {
  const {
    backups,
    seleccionado,
    cargando,
    restaurando,
    showConfirm,
    setSeleccionado,
    setShowConfirm,
    abrirConfirmacion,
    confirmarRestaurar,
    recargar,
  } = useRestaurarBackupForm();

  return (
    <FormularioMarco
      titulo="Restaurar backup"
      descripcion="Seleccioná el backup diario al que querés volver. Se conservan los últimos 7 días."
    >
      <div className="space-y-4">
        {cargando ? (
          <div className="text-gray-500 text-sm">Cargando backups...</div>
        ) : backups.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No hay backups disponibles en el servidor.
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg divide-y max-h-80 overflow-y-auto">
            {backups.map((b) => (
              <label
                key={b.archivo}
                className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                  seleccionado?.archivo === b.archivo ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="backup"
                    checked={seleccionado?.archivo === b.archivo}
                    onChange={() => setSeleccionado(b)}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {formatearFecha(b.fecha)}
                    </div>
                    <div className="text-xs text-gray-500">{b.archivo}</div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{b.tamanioMB} MB</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={recargar}>
            <i className="bi bi-arrow-clockwise" /> Actualizar listado
          </Button>

          <Button
            type="button"
            variant="danger"
            disabled={!seleccionado || restaurando}
            onClick={abrirConfirmacion}
          >
            {restaurando ? "Restaurando..." : "Restaurar"}
          </Button>
        </div>
      </div>

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmarRestaurar}
        titulo="Confirmar restauración"
        varianteConfirmar="danger"
        textoConfirmar="Sí, restaurar"
        mensaje={
          <>
            Vas a restaurar la base de datos al backup del{" "}
            <strong>{seleccionado && formatearFecha(seleccionado.fecha)}</strong>.
            <br />
            <br />
            Esta acción <strong>reemplaza todos los datos actuales</strong> por
            los de ese día y no se puede deshacer. ¿Confirmás?
          </>
        }
      />
    </FormularioMarco>
  );
}
