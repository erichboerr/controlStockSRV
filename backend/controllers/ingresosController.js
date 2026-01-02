import { registrarIngresoService, registrarEgresoService } from "../services/ingresosService.js";

// POST /stock/ingreso
export async function registrarIngreso(req, res, next) {
  try {
    const { proveedorId, remito, items } = req.body;
    await registrarIngresoService({ proveedorId, remito, items });
    res.json({ success: true, message: "Ingreso registrado" });
  } catch (err) {
    next(err);
  }
}

// POST /stock/egreso
export async function registrarEgreso(req, res, next) {
  try {
    const { servicioId, items } = req.body;
    await registrarEgresoService({ servicioId, items });
    res.json({ success: true, message: "Egreso registrado" });
  } catch (err) {
    next(err);
  }
}