import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((current) => !current);
  };

  return (
    <div className="app-shell d-flex min-vh-100 bg-body-tertiary">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="app-main d-flex flex-column flex-grow-1">
        <Topbar />

        <main className="app-content flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
