import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState, AppDispatch } from "../../app/store"
import { authThunk } from "./authThunks"
import { fetchCurrentUserThunk } from "../users/userThunks"
import { LoginData } from "../../types/auth-types"
import { Input, Button } from "../../components"

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { error: authError } = useSelector((state: RootState) => state.auth)
  const { error: userError } = useSelector((state: RootState) => state.users)

  const handleLogin = async () => {
    const loginData: LoginData = { username, password }
    try {
      await dispatch(authThunk(loginData)).unwrap()
      await dispatch(fetchCurrentUserThunk()).unwrap()
      navigate("/home")
    } catch (error: any) {
      console.error("Login failed:", error)
    }
  }

  const goToRegister = () => {
    navigate("/register")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={authError?.message || userError?.message}
          />
          <Button
            label="Login"
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          />
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={goToRegister}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
