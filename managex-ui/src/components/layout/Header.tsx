import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../Button"
import { useDispatch } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import { AppDispatch } from "../../app/store"
import { ChartNoAxesGantt, UserPen, House, LogOut } from "lucide-react"

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation() // Get the current route

  const handleLogout = () => {
    dispatch(logout())
  }

  const isActive = (path: string) => location.pathname === path // Check if the route matches

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold">
          Manage<span className="text-red-500">X</span>
        </h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li className="flex items-center space-x-1 pr-2">
              <House className="h-4" />
              <Link
                to="/home"
                className={`hover:underline ${
                  isActive("/home")
                    ? "underline decoration-red-500 decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-1 pr-2">
              <ChartNoAxesGantt className="h-5" />
              <Link
                to="/gantt"
                className={`hover:underline ${
                  isActive("/gantt")
                    ? "underline decoration-red-500 decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Gantt
              </Link>
            </li>
            <li className="flex items-center space-x-1 pr-2">
              <UserPen className="h-4" />
              <Link
                to="/myprojects"
                className={`hover:underline ${
                  isActive("/myprojects")
                    ? "underline decoration-red-500 decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                My Projects
              </Link>
            </li>
            <li className="flex items-center space-x-1 pr-2">
              <Button
                svg={<LogOut className="w-5" />} // Pass the LogOut icon as the svg prop
                label="Logout"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
