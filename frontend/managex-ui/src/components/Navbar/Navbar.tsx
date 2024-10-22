import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  routes: Array<{ path: string; label: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({ routes }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {routes.map(({ path, label }) => (
              <li className="nav-item" key={label}>
                <Link className="nav-link" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
