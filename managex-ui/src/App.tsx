// src/App.tsx
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import { GanttChart } from "./pages/GanttChart"
import { Overview } from "./pages/Overview"
import { MyProjects } from "./pages/MyProjects"
import { Login } from "./pages/Login"
import PrivateRoute from "./components/PrivateRoutes"

const App = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/home" element={<Overview />} />
          <Route path="/gantt" element={<GanttChart />} />
          <Route path="/myprojects" element={<MyProjects />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
