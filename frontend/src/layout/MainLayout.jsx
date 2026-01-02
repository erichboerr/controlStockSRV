import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Siderbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}