import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";

import usuariosRoutes from "./routes/usuarios.js";
import rolesRoutes from "./routes/roles.js";
import ProveedoresRoute from "./routes/proveedores.js";
import ServiciosRoute from "./routes/servicios.js";
import authRoutes from "./routes/auth.js";
import marcasRoutes from "./routes/marcas.js";
import modelosRoutes from "./routes/modelos.js";
import insumosRoutes from "./routes/insumos.js";
import impresorasRoutes from "./routes/impresoras.js";
import impresorasFisicasRoutes from "./routes/impresorasFisicas.js";
import impresoraServicioRoutes from "./routes/impresoraServicio.js";
import ingresosRoutes from "./routes/ingresos.js";
import egresosRoutes from "./routes/egresos.js";
import stockRoutes from "./routes/stock.js";
import reportesRouter from "./routes/reportes.js";
import repuestosRouter from "./routes/repuestos.js";
import logRouter from "./routes/logs.js";

const app = express();

// Seguridad y logging
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/roles", rolesRoutes);
app.use("/proveedores", ProveedoresRoute);
app.use("/servicios", ServiciosRoute);
app.use("/auth", authRoutes);           
app.use("/marcas", marcasRoutes);
app.use("/modelos", modelosRoutes);
app.use("/insumos", insumosRoutes);
app.use("/impresoras", impresorasRoutes);
app.use("/impresorasFisicas", impresorasFisicasRoutes);
app.use("/impresorasServicio", impresoraServicioRoutes);
app.use("/ingresos", ingresosRoutes);  
app.use("/egresos", egresosRoutes);
app.use("/stock", stockRoutes);
app.use("/reportes", reportesRouter);
app.use("/repuestos", repuestosRouter);
app.use("/logs", logRouter);

// Middleware de errores al final
app.use(errorHandler);

export default app;