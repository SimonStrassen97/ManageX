import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../Button"
import { useDispatch } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import { AppDispatch } from "../../app/store"

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <header>
        <h1>ManageX</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/gantt">Gantt</Link>
          </li>
          <li>
            <Link to="/myprojects">My Projects</Link>
          </li>
          <li>
            <Button label="Logout" onClick={handleLogout} />
          </li>
        </ul>
      </nav>
    </div>
  )
}
