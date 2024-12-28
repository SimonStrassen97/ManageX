import React from "react"
import { Link } from "react-router-dom"

export const Header = () => {
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
        </ul>
      </nav>
    </div>
  )
}
