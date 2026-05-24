import FormularioMarco from "../../common/components/FormularioMarco.jsx";
import Button from "../../common/components/Button.jsx";
import useStockRepuestosForm from "./hooks/useStockRepuestosForm.js";
import generarPdfStockRepuestos  from "./helpers/generarPdfStockRepuestos.js";

export default function StockRepuestos() {
  const { data } = useStockRepuestosForm();

  return (
    <FormularioMarco titulo="Informe de Stock de Repuestos">
      <div className="flex justify-end mb-4">
        <Button
          variant="primary"
          onClick={() => generarPdfStockRepuestos (data)}
          className="bg-blue-600 text-white"
        >
          Imprimir PDF
        </Button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Repuestos</th>
            <th className="p-2 border">Ingresos</th>
            <th className="p-2 border">Egresos</th>
            <th className="p-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2 border">{i.repuesto}</td>
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
