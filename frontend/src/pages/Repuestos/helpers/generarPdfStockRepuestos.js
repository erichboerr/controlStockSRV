import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generarPdfStockRepuestos(data) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Informe de Stock de Repuestos", 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [["Repuestos", "Ingresos", "Egresos", "Stock"]],
    body: data.map((i) => [
      i.repuesto,
      i.ingresos,
      i.egresos,
      i.stock,
    ]),
  });

  doc.save("reporte_stock_repuestos.pdf");
}