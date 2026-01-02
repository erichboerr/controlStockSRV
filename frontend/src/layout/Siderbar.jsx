import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../src/common/hooks/useAuth";

const routeMap = {
  // Usuarios
  "Alta Usuario": "/AltaUsuario",
  "Editar Usuario": "/EditarUsuario",
  "Resetear contraseña": "/ActualizarPassword",
  "Eliminar Usuario": "/BajaUsuario",

  // Proveedores
  "Alta Proveedor": "/AgregarProveedor",
  "Editar Proveedor": "/EditarProveedor",
  "Baja Proveedor": "/EliminarProveedor",

  // Servicios
  "Alta Servicio": "/AgregarServicio",
  "Editar Servicio": "/EditarServicio",
  "Baja Servicio": "/EliminarServicio",

  // Impresoras
  "Crear Impresora": "/AgregarImpresora",
  "Ingreso Impresora": "/IngresarImpresora",
  "Entregar Impresora": "/EntregarImpresora",
  "Retirar Impresora": "/RetirarImpresora",
  "Baja Impresora": "/BajaImpresora",

  // Marcas
  "Agregar Marca": "/AgregarMarca",
  "Editar Marca": "/EditarMarca",

  // Modelos
  "Agregar Modelo": "/AgregarModelo",
  "Editar Modelo": "/EditarModelo",

  // Insumos
  "Agregar Insumo": "/AgregarInsumo",
  "Editar Insumo": "/EditarInsumo",
  "Eliminar Insumo": "/EliminarInsumo",
  "Modificar Stock mínimo": "/ModificarStockMinimo",

  // Movimientos
  "Ingreso de insumos": "/IngresoInsumos",
  "Entrega de insumos": "/EgresoInusmos",
  "Ajuste de insumos": "AjusteInsumos",

  //reportes
  Stock: "/ReporteStock",
  "Movimiento por Servicios": "/ReporteMovimientosServicio",
  "Movimiento por Insumos": "/ReporteMovInsumos",
  "Ingreso por Insumos": "/ReporteIngresosPorInsumo",
  "Ingreso por Proveedor": "/ReporteIngresosPorProveedor",

  //repuestos
  "Crear Repuesto": "/AgregarRepuesto",
  "Ingreso Repuesto": "/IngresoRepuesto",
  "Entregar Repuesto": "/EgresoRepuesto",
  "Ajuste Repuestos": "/AjusteRepuestos",
  "Stock Repuestos": "/StockRepuestos",

  //logs
  "Mostrar Logs": "/logs",
};

export default function Sidebar() {
  const [openGroup, setOpenGroup] = useState(null);
  const { auth } = useAuth();

  const handleToggle = (label) => {
    setOpenGroup(openGroup === label ? null : label);
  };

  return (
    <aside className="w-64 bg-gray-300 border-r border-gray-400 shadow-sm hidden md:block">
      <div className="p-4">
        <h2 className="text-black-500 text-lg font-semibold uppercase tracking-wide mb-4">
          Navegación
        </h2>

        <nav className="space-y-1">
          {auth.idRol === 1 && (
            <SidebarGroup
              label="Usuarios"
              icon={<i className="bi bi-person-square text-lg"></i>}
              open={openGroup === "Usuarios"}
              onToggle={() => handleToggle("Usuarios")}
              items={[
                "Alta Usuario",
                "Editar Usuario",
                "Resetear contraseña",
                "Eliminar Usuario",
              ]}
            />
          )}

          <SidebarGroup
            label="Proveedores"
            icon={<i className="bi bi-truck text-lg"></i>}
            open={openGroup === "Proveedores"}
            onToggle={() => handleToggle("Proveedores")}
            items={["Alta Proveedor", "Editar Proveedor", "Baja Proveedor"]}
          />

          <SidebarGroup
            label="Servicios"
            icon={<i className="bi bi-shop text-lg"></i>}
            open={openGroup === "Servicios"}
            onToggle={() => handleToggle("Servicios")}
            items={["Alta Servicio", "Editar Servicio", "Baja Servicio"]}
          />

          {/* 🔹 Separador visual */}
          <hr className="my-4 border-gray-400" />

          {/* ✅ Impresoras + Marcas + Modelos + Insumos */}
          <SidebarGroup
            label="Impresoras"
            icon={<i className="bi bi-printer text-lg"></i>}
            open={openGroup === "Impresoras"}
            onToggle={() => handleToggle("Impresoras")}
            items={[
              "Crear Impresora",
              "Ingreso Impresora",
              "Entregar Impresora",
              "Retirar Impresora",
              "Baja Impresora",
            ]}
          />

          {auth.idRol === 1 && (
            <SidebarGroup
              label="Marca"
              icon={<i className="bi bi-bookmark-plus text-lg"></i>}
              open={openGroup === "Marca"}
              onToggle={() => handleToggle("Marca")}
              items={["Agregar Marca", "Editar Marca"]}
            />
          )}

          {auth.idRol === 1 && (
            <SidebarGroup
              label="Modelos"
              icon={<i className="bi bi-file-diff text-lg"></i>}
              open={openGroup === "Modelos"}
              onToggle={() => handleToggle("Modelos")}
              items={["Agregar Modelo", "Editar Modelo"]}
            />
          )}

          {auth.idRol === 1 && (
            <SidebarGroup
              label="Insumos"
              icon={<i className="bi bi-droplet text-lg"></i>}
              open={openGroup === "Insumos"}
              onToggle={() => handleToggle("Insumos")}
              items={[
                "Agregar Insumo",
                "Editar Insumo",
                "Eliminar Insumo",
                "Modificar Stock mínimo",
              ]}
            />
          )}

          <SidebarGroup
            label="Ingresos y Egresos"
            icon={<i className="bi bi-box text-lg"></i>}
            open={openGroup === "Ingresos y Egresos"}
            onToggle={() => handleToggle("Ingresos y Egresos")}
            items={[
              "Ingreso de insumos",
              "Entrega de insumos",
              "Ajuste de insumos",
            ]}
          />

          <SidebarGroup
            label="Reportes"
            icon={<i className="bi bi-clipboard-data text-lg"></i>}
            open={openGroup === "Reportes"}
            onToggle={() => handleToggle("Reportes")}
            items={[
              "Stock",
              "Movimiento por Servicios",
              "Movimiento por Insumos",
              "Ingreso por Proveedor",
              "Ingreso por Insumos",
            ]}
          />
        </nav>

        {/* 🔹 Separador visual */}
        <hr className="my-4 border-gray-400" />
        <h3 className="text-black-500 text-sm font-semibold uppercase tracking-wide mb-2">
          Productos Varios
        </h3>
        <nav className="space-y-1">
          <SidebarGroup
            label="Repuestos"
            icon={<i className="bi bi-pc-display text-lg"></i>}
            open={openGroup === "Repuestos"}
            onToggle={() => handleToggle("Repuestos")}
            items={[
              "Crear Repuesto",
              "Ingreso Repuesto",
              "Entregar Repuesto",
              "Ajuste Repuestos",
            ]}
          ></SidebarGroup>

          <SidebarGroup
            label="Reportes de Repuestos"
            icon={<i className="bi bi-journal-text text-lg"></i>}
            open={openGroup === "Reportes de Repuestos"}
            onToggle={() => handleToggle("Reportes de Repuestos")}
            items={["Stock Repuestos"]}
          ></SidebarGroup>

          {/* 🔹 Separador visual */}
          <hr className="my-4 border-gray-400" />

          {/*logs del sistema */}
          {auth.idRol === 1 && (
            <SidebarGroup
              label="Logs del Sistema"
              icon={<i className="bi bi-clipboard-data text-lg"></i>}
              open={openGroup === "Logs del Sistema"}
              onToggle={() => handleToggle("Logs del Sistema")}
              items={["Mostrar Logs"]}
            />
          )}
        </nav>
      </div>
    </aside>
  );

  function SidebarGroup({ label, icon, open, onToggle, items, children }) {
    return (
      <div>
        <div
          onClick={onToggle}
          className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{icon}</span>
            <span className="font-medium">{label}</span>
          </div>
          <span className="text-gray-500">{open ? "▲" : "▼"}</span>
        </div>

        {open && (
          <div className="ml-10 mt-1 space-y-1">
            {items.map((item) => (
              <Link
                key={item}
                to={routeMap[item] || "#"}
                className="block px-3 py-1 text-gray-600 hover:text-blue-600 cursor-pointer transition"
              >
                {item}
              </Link>
            ))}

            {/* ✅ Aquí se renderizan los subgrupos */}
            {children}
          </div>
        )}
      </div>
    );
  }
}
