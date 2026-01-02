// helpers/pdfEgreso.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function pdfEgreso({ servicio, lista }) {
  try {
    const doc = new jsPDF();

    const fecha = new Date().toLocaleString("es-AR", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Título
    doc.setFontSize(18);
    doc.text("Comprobante de Egreso de Repuestos", 14, 20);

    // Datos principales
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 14, 35);
    doc.text(`Servicio: ${servicio?.servicio || "-"}`, 14, 42);

    // Tabla de ítems
    autoTable(doc, {
      startY: 55,
      head: [["Repuesto", "Cantidad"]],
      body: lista.map((item) => [item.repuesto, item.cantidad]),
    });

    // Pie
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.text("Firma: ___________________________", 14, finalY);

    // Descargar
    doc.save(`egreso_${servicio?.servicio || "servicio"}.pdf`);
  } catch (error) {
    console.error("Error al generar PDF:", error);
  }
}