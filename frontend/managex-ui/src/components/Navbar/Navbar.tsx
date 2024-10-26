import React from "react";
import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkMode";

// Define the type for the props
interface NavbarProps {
  routes: Array<{ path: string; label: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({ routes }) => {
  return (
    <nav className="fixed top-0 w-screen bg-purple-900 p-4">
      {/* Changed container to w-full for full width */}
      <div className="flex justify-between items-center w-full">
        <div className="text-white text-xl font-bold">MyWebsite</div>
        {/* Make sure the ul is flex and takes up remaining space */}
        <ul className="navbar-nav flex space-x-4 ml-auto">
          {routes.map(({ path, label }) => (
            <li className="nav-item" key={label}>
              <Link
                className="nav-link text-white hover:text-gray-300"
                to={path}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <DarkModeToggle />
      </div>
    </nav>
  );
};
