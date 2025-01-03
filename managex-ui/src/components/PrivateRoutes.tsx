import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { RootState, AppDispatch } from "../app/store"
import { refreshThunk } from "../features/auth/authThunks"

interface PrivateRouteProps {
  element: JSX.Element
}

interface TokenPayload {
  exp: number
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth,
  )
  const access_token = localStorage.getItem("access_token")
  const refresh_token = localStorage.getItem("refresh_token")

  useEffect(() => {
    if (access_token) {
      const decodedToken: TokenPayload = jwtDecode(access_token)
      const currentTime = Date.now() / 1000

      if (decodedToken.exp < currentTime && refresh_token) {
        dispatch(refreshThunk(refresh_token))
      }
    } else if (refresh_token) {
      dispatch(refreshThunk(refresh_token))
    }
  }, [dispatch, access_token, refresh_token])

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? element : <Navigate to="/login" />
}
