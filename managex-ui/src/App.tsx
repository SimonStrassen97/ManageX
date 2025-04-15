// src/App.tsx
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import { Gantt } from "./pages/Gantt"
import { Overview } from "./pages/Overview"
import { MyProjects } from "./pages/MyProjects"
import { Kanban } from "./pages/Kanban"
import { Analytics } from "./pages/Analytics"
import { Login } from "./features/auth/Login"
import { Register } from "./features/auth/Register"
import { PrivateRoute } from "./components/PrivateRoutes"
import "./index.css" // Ensure this is imported

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<Overview />} />}
          />
          <Route path="/gantt" element={<PrivateRoute element={<Gantt />} />} />
          <Route
            path="/myprojects"
            element={<PrivateRoute element={<MyProjects />} />}
          />
          <Route
            path="/kanban"
            element={<PrivateRoute element={<Kanban />} />}
          />
          <Route
            path="/analytics"
            element={<PrivateRoute element={<Analytics />} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />{" "}
          {/* Redirect from / to /home */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
