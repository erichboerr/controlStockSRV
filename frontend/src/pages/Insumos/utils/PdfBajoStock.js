import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarPdfBajoStock(data, filtroDescripcion) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "A4"
    });

    // Título
    doc.setFontSize(18);
    doc.text("Reporte de Insumos con Stock Bajo", 40, 40);

    // Fecha
    doc.setFontSize(11);
    const fecha = new Date().toLocaleDateString("es-AR");
    doc.text(`Fecha: ${fecha}`, 40, 60);

    let startY = 90;
    if (filtroDescripcion) {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Filtro aplicado: ${filtroDescripcion}`, 40, 76);
        doc.setTextColor(0);
        startY = 100;
    }

    // Columnas
    const columnas = [
        { header: "Marca", dataKey: "marca" },
        { header: "Modelo", dataKey: "modelo" },
        { header: "Insumo", dataKey: "insumo" },
        { header: "Stock actual", dataKey: "stock_actual" },
        { header: "Stock mínimo", dataKey: "stock_minimo" }
    ];

    // Normalizamos: si un insumo no tiene modelo asociado, mostramos "-"
    const filas = data.map((item) => ({
        ...item,
        marca: item.marca ?? "-",
        modelo: item.modelo ?? "-",
    }));

    autoTable(doc, {
        startY,
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
        body: filas,
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

    doc.save("insumos_stock_bajo.pdf");
}
