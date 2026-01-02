import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import useReporteStock from "./hooks/useReporteStock.js";
import generarPdfStock from "./utils/generarPdfStock.js";

export default function ReporteStock() {
  const { data } = useReporteStock();

  return (
    <FormularioMarco titulo="Informe de Stock">
      <div className="flex justify-end mb-4">
        <Button
          variant="primary"
          onClick={() => generarPdfStock(data)}
          className="bg-blue-600 text-white"
        >
          Imprimir PDF
        </Button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Insumo</th>
            <th className="p-2 border">Ingresos</th>
            <th className="p-2 border">Egresos</th>
            <th className="p-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2 border">{i.insumo}</td>
              <td className="p-2 border">{i.ingresos}</td>
              <td className="p-2 border">{i.egresos}</td>
              <td className="p-2 border font-bold">{i.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </FormularioMarco>
  );
}
