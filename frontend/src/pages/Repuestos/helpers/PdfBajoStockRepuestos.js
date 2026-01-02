import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarPdfBajoStockRepuestos(data) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "A4"
  });

  // Título
  doc.setFontSize(18);
  doc.text("Reporte de Repuestos con Stock Bajo", 40, 40);

  // Fecha
  doc.setFontSize(11);
  const fecha = new Date().toLocaleDateString("es-AR");
  doc.text(`Fecha: ${fecha}`, 40, 60);

  // Columnas
  const columnas = [
    { header: "Repuestos", dataKey: "nombre" },
    { header: "Stock actual", dataKey: "stock_actual" },
    { header: "Stock mínimo", dataKey: "stock_minimo" }
  ];

  // Tabla con número de página en el pie
  autoTable(doc, {
    startY: 90,
    headStyles: {
      fillColor: [66, 66, 66],
      textColor: 255,
      fontSize: 11
    },
    bodyStyles: {
      fontSize: 10
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { left: 40, right: 40 },
    columns: columnas,
    body: data,
    didDrawPage: () => {
      const pageNumber = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(
        `Página ${pageNumber}`,
        doc.internal.pageSize.getWidth() - 80,
        doc.internal.pageSize.getHeight() - 20
      );
    }
  });

  // Guardar PDF
  doc.save("insumos_stock_bajo_repuestos.pdf");
}