// frontend/src/pages/logs/LogsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { logsUrl } from "../../config/env.js";
import { getToken } from "../../common/utils/auth.js";

function parseLine(line) {
  try {
    const obj = JSON.parse(line);
    return {
      timestamp: obj.timestamp,
      controller: obj.controller,
      action: obj.action,
      route: obj.route,
      method: obj.method,
      message: obj.message,
      level: obj.level,
      code: obj.code,
      httpStatus: obj.httpStatus,
      stack: obj.stack,
    };
  } catch {
    return { raw: line };
  }
}

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filterController, setFilterController] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`${logsUrl}/logs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filtrar duplicados de archivos
        const uniqueLogs = res.data.filter(
          (log, index, self) =>
            index === self.findIndex((l) => l.file === log.file)
        );

        // Parsear contenido
        const parsedLogs = uniqueLogs
          .flatMap((log) =>
            log.content
              .split("\n")
              .map((line) => {
                const parsed = parseLine(line);
                return parsed.raw ? null : { ...parsed, file: log.file };
              })
              .filter(Boolean)
          );

        setLogs(parsedLogs);
      } catch (err) {
        console.error("Error al cargar logs", err);
      }
    };
    fetchLogs();
  }, []);

  // Filtros
  const filteredLogs = logs.filter((log) => {
    return (
      (!filterController || log.controller?.includes(filterController)) &&
      (!filterLevel || log.level === filterLevel) &&
      (!filterDate || log.timestamp?.startsWith(filterDate)) &&
      (!filterAction || log.action?.includes(filterAction))
    );
  });

  // Paginación
  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📑 Logs del sistema</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por controller"
          value={filterController}
          onChange={(e) => setFilterController(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filtrar por acción"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos los niveles</option>
          <option value="error">Error</option>
          <option value="warn">Warning</option>
          <option value="info">Info</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">🕒 Fecha</th>
            <th className="border p-2">📂 Controller</th>
            <th className="border p-2">⚙️ Acción</th>
            <th className="border p-2">➡️ Ruta</th>
            <th className="border p-2">🔠 Método</th>
            <th className="border p-2">📑 Código</th>
            <th className="border p-2">📊 Status</th>
            <th className="border p-2">❌ Error</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.map((log, idx) => (
            <tr
              key={idx}
              className={
                log.level === "error"
                  ? "bg-red-50"
                  : log.level === "warn"
                  ? "bg-yellow-50"
                  : "bg-white"
              }
            >
              <td className="border p-2">{log.timestamp}</td>
              <td className="border p-2">{log.controller}</td>
              <td className="border p-2">{log.action}</td>
              <td className="border p-2">{log.route}</td>
              <td className="border p-2">{log.method}</td>
              <td className="border p-2">{log.code}</td>
              <td className="border p-2">{log.httpStatus}</td>
              <td className="border p-2 text-red-600">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ⬅️ Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
};

export default LogsPage;  