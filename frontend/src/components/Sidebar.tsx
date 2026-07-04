import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Vote as VoteIcon, UserCheck, BarChart3, MapPin, Settings, Info } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/voters", label: "Voters", icon: Users },
  { path: "/elections", label: "Elections", icon: VoteIcon },
  { path: "/candidates", label: "Candidates", icon: UserCheck },
  { path: "/results", label: "Results", icon: BarChart3 },
  { path: "/states", label: "States", icon: MapPin },
  { path: "/vote", label: "Vote", icon: VoteIcon },
  { path: "/admin", label: "Settings", icon: Settings },
  { path: "/about", label: "About", icon: Info }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">EMS</h2>
        <p className="sidebar-subtitle">Election Management</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <p className="footer-text">© 2026 EMS v1.0.0</p>
      </div>
    </aside>
  );
}
