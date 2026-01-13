import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import PrivateRoute from "./PrivateRoute";

//Login
import Login from "../pages/login/Login.jsx";
// Usuarios
import AgregarUsuario from "../pages/Usuarios/AgregarUsuario.jsx";
import EditarUsuario from "../pages/Usuarios/EditarUsuario.jsx";
import EliminarUsuario from "../pages/Usuarios/EliminarUsuario.jsx";
import ResetearContraseña from "../pages/Usuarios/ResetearContraseña.jsx";

//DashBoard
import StockMinimoDashboard from "../common/components/StockMinimoDashBoard.jsx";

// Servicios
import AgregarServicio from "../pages/Servicios/AgregarServicio.jsx";
import EditarServicio from "../pages/Servicios/EditarServicio.jsx";
import EliminarServicio from "../pages/Servicios/EliminarServicio.jsx";

// Proveedores
import AgregarProveedor from "../pages/Proveedores/AgregarProveedor.jsx";
import EditarProveedor from "../pages/Proveedores/EditarProveedor.jsx";
import EliminarProveedor from "../pages/Proveedores/EliminarProveedor.jsx";

//impresoras
import AgregarImpresora from "../pages/Impresoras/AgregarImpresora.jsx";
import IngresarImpresora from "../pages/Impresoras/IngresarImpresora.jsx";
import EntrgarImpresora from "../pages/Impresoras/EntregarImpresora.jsx";
import RetirarImpresora from "../pages/Impresoras/RetirarImpresora.jsx";
import BajaImpresora from "../pages/Impresoras/BajaImpresora.jsx";
import CambioSerieImpresora from "../pages/Impresoras/CambioSerieImpresora.jsx";

//Marcas
import AgregarMarca from "../pages/Marcas/AgregarMarca.jsx";
import EditarMarca from "../pages/Marcas/EditarMarca.jsx";

//Modelos
import AgregarModelo from "../pages/Modelos/AgregarModelo.jsx";
import EditarModelo from "../pages/Modelos/EditarModelo.jsx";

//insumos
import AgregarInsumo from "../pages/Insumos/AgregarInsumo.jsx";
import EditarInsumo from "../pages/Insumos/EditarInsumo.jsx";
import EliminarInsumo from "../pages/Insumos/EliminarInsumo.jsx";
import ModificarStockMinimo from "../pages/Insumos/ModificarStockMinimo.jsx";

// Ingresos de insumos
import IngresoInsumos from "../pages/Ingresos/IngresoInsumos.jsx";

// Egresos de insumos
import EgresoInusmos from "../pages/Egresos/EgresoInsumos.jsx";
import AjusteInsumos from "../pages/Egresos/AjustesInsumos.jsx";

//Reportes
import ReporteStock from "../pages/Reportes/ReporteStock.jsx";
import ReporteMovimientosServicio from "../pages/Reportes/ReporteMovInsumosServicio.jsx";
import ReporteMovInsumos from "../pages/Reportes/ReporteMovInsumos.jsx";
import ReporteIngresosPorInsumo from "../pages/Reportes/ReporteIngresosPorInsumo.jsx";
import ReporteIngresosPorProveedor from "../pages/Reportes/ReporteIngresosPorProveedor.jsx";

//Repuestos
import AgregarRepuesto from "../pages/Repuestos/AgregarRepuesto.jsx";
import IngresoRepuesto from "../pages/Repuestos/IngresoRepuestos.jsx";
import EgresoRepuesto from "../pages/Repuestos/EgresoRepuestos.jsx";
import AjusteRepuestos from "../pages/Repuestos/AjusteRepuestos.jsx";
import StockRepuestos from "../pages/Repuestos/StockRepuestos.jsx";

//Logs
import Logs from "../pages/Logs/PageLogs.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        {/* Inicio */}
        <Route index element={<StockMinimoDashboard />} />
        <Route path="/inicio" element={<StockMinimoDashboard />} />
        {/* Usuarios */}
        <Route path="/AltaUsuario" element={<AgregarUsuario />} />
        <Route path="/EditarUsuario" element={<EditarUsuario />} />
        <Route path="/BajaUsuario" element={<EliminarUsuario />} />
        <Route path="/ActualizarPassword" element={<ResetearContraseña />} />
        {/* Servicios */}
        <Route path="/AgregarServicio" element={<AgregarServicio />} />
        <Route path="/EditarServicio" element={<EditarServicio />} />
        <Route path="/EliminarServicio" element={<EliminarServicio />} />
        {/* Proveedores */}
        <Route path="/AgregarProveedor" element={<AgregarProveedor />} />
        <Route path="/EditarProveedor" element={<EditarProveedor />} />
        <Route path="/EliminarProveedor" element={<EliminarProveedor />} />
        {/* Impresoras */}
        <Route path="/AgregarImpresora" element={<AgregarImpresora />} />
        <Route path="/IngresarImpresora" element={<IngresarImpresora />} />
        <Route path="/EntregarImpresora" element={<EntrgarImpresora />} />
        <Route path="/RetirarImpresora" element={<RetirarImpresora />} />
        <Route path="/BajaImpresora" element={<BajaImpresora />} />
        <Route path="/CambioSerieImpresora" element= {<CambioSerieImpresora/>} />
        
        {/* marcas */}
        <Route path="/AgregarMarca" element={<AgregarMarca />} />
        <Route path="/EditarMarca" element={<EditarMarca />} />
        {/* modelos */}
        <Route path="/AgregarModelo" element={<AgregarModelo />} />
        <Route path="/EditarModelo" element={<EditarModelo />} />
        {/* insumos */}
        <Route path="/AgregarInsumo" element={<AgregarInsumo />} />
        <Route path="/EditarInsumo" element={<EditarInsumo />} />
        <Route path="/EliminarInsumo" element={<EliminarInsumo />} />
        <Route
          path="/ModificarStockMinimo"
          element={<ModificarStockMinimo />}
        />
        {/* Ingresos de insumos */}
        <Route path="/IngresoInsumos" element={<IngresoInsumos />} />
        {/* Egresos de insumos */}
        <Route path="/EgresoInusmos" element={<EgresoInusmos />} />
        <Route path="/AjusteInsumos" element={<AjusteInsumos />} />
        {/* Reportes */}
        <Route path="/ReporteStock" element={<ReporteStock />} />
        <Route
          path="/ReporteMovimientosServicio"
          element={<ReporteMovimientosServicio />}
        />
        <Route path="/ReporteMovInsumos" element={<ReporteMovInsumos />} />
        <Route
          path="/ReporteIngresosPorInsumo"
          element={<ReporteIngresosPorInsumo />}
        />
        <Route
          path="/ReporteIngresosPorProveedor"
          element={<ReporteIngresosPorProveedor />}
        />
        {/* Repuestos */}
        <Route path="/AgregarRepuesto" element={<AgregarRepuesto />} />
        <Route path="/IngresoRepuesto" element={<IngresoRepuesto />} />
        <Route path="/EgresoRepuesto" element={<EgresoRepuesto />} />
        <Route path="/AjusteRepuestos" element={<AjusteRepuestos />} />
        <Route path="/StockRepuestos" element={<StockRepuestos />} />
        {/*Logs*/}
        <Route path="/logs" element={<Logs />} />
      </Route>
    </Routes>
  );
}
