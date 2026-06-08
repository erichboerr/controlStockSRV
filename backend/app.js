import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

import usuarioRoutes from './routes/usuario.js';
import rolRoutes from './routes/rol.js';
import ProveedorRoute from './routes/proveedor.js';
import ServicioRoute from './routes/servicio.js';
import authRoutes from './routes/auth.js';
import marcaRoutes from './routes/marca.js';
import modeloRoutes from './routes/modelo.js';
import insumoRoutes from './routes/insumo.js';
import impresoraRoutes from './routes/impresora.js';
import impresoraFisicaRoutes from './routes/impresoraFisica.js';
import impresoraServicioRoutes from './routes/impresoraServicio.js';
import ingresoRoutes from './routes/ingreso.js';
import egresoRoutes from './routes/egreso.js';
import stockRoutes from './routes/stock.js';
import reporteRouter from './routes/reporte.js';
import repuestosRouter from './routes/repuesto.js';
import logsRouter from './routes/log.js';

const app = express();

// Seguridad y logging
app.use(helmet());
app.use(morgan('combined'));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/roles', rolRoutes);
app.use('/proveedores', ProveedorRoute);
app.use('/servicios', ServicioRoute);
app.use('/auth', authRoutes);
app.use('/marcas', marcaRoutes);
app.use('/modelos', modeloRoutes);
app.use('/insumos', insumoRoutes);
app.use('/impresoras', impresoraRoutes);
app.use('/impresorasFisicas', impresoraFisicaRoutes);
app.use('/impresorasServicio', impresoraServicioRoutes);
app.use('/ingresos', ingresoRoutes);
app.use('/egresos', egresoRoutes);
app.use('/stock', stockRoutes);
app.use('/reportes', reporteRouter);
app.use('/repuestos', repuestosRouter);
app.use('/logs', logsRouter);

// Middleware de errores al final
app.use(errorHandler);

export default app;
