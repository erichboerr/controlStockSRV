import { useEffect } from "react";
import StockMinimoInsumos from "../../pages/Insumos/StockBajo";
import StockMinimoRepuestos from "../../pages/Repuestos/StockBajoRepuestos";

const StockMinimoDashboard = () => {
  useEffect(() => {
    // refrescar cada 5 minutos (300000 ms)
    const interval = setInterval(() => {
      // Forzar un reload de la página completa
      // o bien disparar un método de fetch en cada componente
      window.location.reload();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Stock mínimo de Insumos</h2>
        <StockMinimoInsumos />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Stock mínimo de Repuestos</h2>
        <StockMinimoRepuestos />
      </div>
    </div>
  );
};

export default StockMinimoDashboard;