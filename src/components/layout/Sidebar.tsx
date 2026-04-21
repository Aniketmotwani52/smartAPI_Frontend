import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/apis", label: "APIs" },
  { to: "/logs", label: "Logs" },
  { to: "/proxy", label: "Proxy" },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Sidebar = ({ isCollapsed, onToggleSidebar }: SidebarProps) => {
  return (
    <aside
      className={`app-sidebar d-flex flex-column vh-100 p-3 border-end bg-white ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="app-sidebar-header mb-4">
        <div
          className={`d-flex align-items-center ${
            isCollapsed ? "justify-content-center" : "justify-content-between"
          }`}
        >
          <p
            className={`app-sidebar-brand text-uppercase text-muted small mb-0 ${
              isCollapsed ? "visually-hidden" : ""
            }`}
          >
            smartAPI
          </p>
          <Button
            variant="outline-secondary"
            onClick={onToggleSidebar}
            className="app-sidebar-toggle rounded-circle d-inline-flex align-items-center justify-content-center"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? "E" : "C"}
          </Button>
        </div>
      </div>

      <Nav className="flex-column gap-2">
        {navItems.map((item) => (
          <Nav.Item key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `app-nav-link d-flex align-items-center rounded px-3 py-2 ${
                  isActive ? "active fw-semibold" : ""
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <span className={`app-nav-label ${isCollapsed ? "d-none" : ""}`}>
                {item.label}
              </span>
              {isCollapsed ? (
                <span className="app-nav-collapsed-label mx-auto">
                  {item.label.charAt(0)}
                </span>
              ) : null}
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
    </aside>
  );
};

export default Sidebar;
