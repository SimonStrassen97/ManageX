import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../Button"
import { useDispatch } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import { AppDispatch } from "../../app/store"
import {
  ChartNoAxesGantt,
  UserPen,
  House,
  LogOut,
  Kanban,
  ChartNoAxesCombined,
} from "lucide-react"

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation() // Get the current route

  const handleLogout = () => {
    dispatch(logout())
  }

  const isActive = (path: string) => location.pathname === path // Check if the route matches

  return (
    <header className="fixed w-full bg-blue-800 text-white z-50">
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
              <ChartNoAxesCombined className="h-4" />
              <Link
                to="/analytics"
                className={`hover:underline ${
                  isActive("/analytics")
                    ? "underline decoration-red-500 decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Analytics
              </Link>
            </li>
            <li className="flex items-center space-x-1 pr-2">
              <Kanban className="h-4" />
              <Link
                to="/kanban"
                className={`hover:underline ${
                  isActive("/kanban")
                    ? "underline decoration-red-500 decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Kanban
              </Link>
            </li>
            <li className="flex items-center space-x-1 pr-2">
              <Button
                label="Logout"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <LogOut className="w-5" />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
