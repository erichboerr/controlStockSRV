import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../src/common/hooks/useAuth";
import { getMenuForRole } from "../../src/common/config/menuConfig.js";

function SidebarGroup({ label, icon, open, onToggle, items, location }) {
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
          {items.map((item) => {
            const isActive = location.pathname === item.route;
            return (
              <Link
                key={item.label}
                to={item.route || "#"}
                className={`block px-3 py-1 transition cursor-pointer ${
                  isActive
                    ? "text-blue-700 font-bold border-l-4 border-blue-600 bg-blue-100/50"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [openGroup, setOpenGroup] = useState(null);
  const { auth } = useAuth();
  const location = useLocation();

  const handleToggle = (key) => setOpenGroup(openGroup === key ? null : key);

  const grupos = getMenuForRole(auth.idRol);

  // Agrupamos por "section" preservando el orden en que aparecen en MENU_CONFIG
  const secciones = [];
  for (const grupo of grupos) {
    let seccion = secciones.find((s) => s.titulo === grupo.section);
    if (!seccion) {
      seccion = { titulo: grupo.section, grupos: [] };
      secciones.push(seccion);
    }
    seccion.grupos.push(grupo);
  }

  return (
    <aside className="w-64 bg-gray-300 border-r border-gray-400 shadow-sm hidden md:block">
      <div className="p-4">
        <h2 className="text-black-500 text-lg font-semibold uppercase tracking-wide mb-4">
          Navegación
        </h2>

        {secciones.map((seccion, idx) => (
          <div key={seccion.titulo ?? `principal-${idx}`}>
            {seccion.titulo && (
              <>
                <hr className="my-4 border-gray-400" />
                <h3 className="text-black-500 text-sm font-semibold uppercase tracking-wide mb-2">
                  {seccion.titulo}
                </h3>
              </>
            )}
            <nav className="space-y-1">
              {seccion.grupos.map((grupo) => (
                <SidebarGroup
                  key={grupo.key}
                  label={grupo.label}
                  icon={<i className={`bi ${grupo.icon} text-lg`}></i>}
                  open={openGroup === grupo.key}
                  onToggle={() => handleToggle(grupo.key)}
                  items={grupo.items}
                  location={location}
                />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
