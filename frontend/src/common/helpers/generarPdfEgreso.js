import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarPdfEgreso({ servicio, marca, modelo, lista }) {
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
    doc.setFontSize(16);
    doc.text("Entrega de Insumos", 14, 15);

    // Datos principales
    doc.setFontSize(11);
    doc.text(`Servicio: ${servicio?.servicio || "-"}`, 14, 30);
    doc.text(`Marca: ${marca?.marca || "-"}`, 14, 38);
    doc.text(`Modelo: ${modelo?.modelo || "-"}`, 14, 46);
    doc.text(`Fecha: ${fecha}`, 14, 54);

    // Tabla
    autoTable(doc, {
      startY: 65,
      head: [["Insumo", "Cantidad"]],
      body: lista.map((i) => [i.insumo, i.cantidad]),
    });

    // Pie
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.text("Firma: ___________________________", 14, finalY);

    // Guardar
    doc.save(`egreso_${servicio?.servicio || "servicio"}.pdf`);
  } catch (error) {
    console.error("Error al generar PDF:", error);
  }
}