import { useEffect, useState } from "react";
import StockMinimoInsumos from "../../pages/Insumos/StockBajo";
import StockMinimoRepuestos from "../../pages/Repuestos/StockBajoRepuestos";
import Modal from "./Modal.jsx";

const StockMinimoDashboard = () => {
  const [showRepuestos, setShowRepuestos] = useState(false);

  useEffect(() => {
    // refrescar cada 5 minutos (300000 ms)
    const interval = setInterval(() => {
      window.location.reload();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Stock mínimo de Insumos</h2>

        <button
          onClick={() => setShowRepuestos(true)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          <i className="bi bi-box-seam" />
          Ver stock mínimo de Repuestos
        </button>
      </div>

      <StockMinimoInsumos />

      <Modal show={showRepuestos} onHide={() => setShowRepuestos(false)}>
        <StockMinimoRepuestos />
      </Modal>
    </div>
  );
};

export default StockMinimoDashboard;
