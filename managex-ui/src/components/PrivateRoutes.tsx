// src/components/PrivateRoute.tsx
import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"

interface PrivateRouteProps {
  element: JSX.Element
  path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )

  if (!isAuthenticated) {
    return <Navigate to="/" /> // Redirect to login if not authenticated
  }

  return <Route path={path} element={element} />
}

export default PrivateRoute
