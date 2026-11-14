import { registrarIngresoService } from "../services/ingresoService.js";

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