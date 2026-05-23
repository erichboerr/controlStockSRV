import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generarPdfStock(data) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Informe de Stock", 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [["Insumo", "Ingresos", "Egresos", "Stock"]],
    body: data.map((i) => [
      i.insumo,
      i.ingresos,
      i.egresos,
      i.stock,
    ]),
  });

  doc.save("reporte_stock.pdf");
}