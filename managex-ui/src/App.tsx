// src/App.tsx
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import { GanttChart } from "./pages/GanttChart"
import { Overview } from "./pages/Overview"
import { MyProjects } from "./pages/MyProjects"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { PrivateRoute } from "./components/PrivateRoutes"

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
          <Route
            path="/gantt"
            element={<PrivateRoute element={<GanttChart />} />}
          />
          <Route
            path="/myprojects"
            element={<PrivateRoute element={<MyProjects />} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />{" "}
          {/* Redirect from / to /home */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
