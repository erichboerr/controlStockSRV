import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import useHacerBackupForm from "./hooks/useHacerBackupForm.jsx";

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

export default function HacerBackup() {
  const { generando, ultimoBackup, generarBackup } = useHacerBackupForm();

  return (
    <FormularioMarco
      titulo="Generar backup"
      descripcion="Crea un backup manual de la base de datos, además del automático diario. Se guarda junto a los demás y respeta la rotación de 7 días."
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant="primary"
          disabled={generando}
          onClick={generarBackup}
        >
          <i className="bi bi-database-fill-down" />{" "}
          {generando ? "Generando backup..." : "Generar backup ahora"}
        </Button>

        {ultimoBackup && (
          <div className="border border-gray-200 rounded-lg px-4 py-3 bg-green-50 text-sm text-gray-700">
            <div className="font-medium">✅ Último backup generado</div>
            <div>{formatearFecha(ultimoBackup.fecha)}</div>
            <div className="text-xs text-gray-500">
              {ultimoBackup.archivo} — {ultimoBackup.tamanioMB} MB
            </div>
          </div>
        )}
      </div>
    </FormularioMarco>
  );
}
