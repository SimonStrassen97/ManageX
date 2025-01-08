import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState, AppDispatch } from "../../app/store"
import { authThunk } from "./authThunks"
import { fetchCurrentUserThunk } from "../users/userThunks"
import { LoginData } from "./auth-types"
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
    <div>
      <h2>Login</h2>
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        error={authError?.message || userError?.message}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={authError?.message || userError?.message}
      />
      <Button label="Login" onClick={handleLogin} />
      <Button label="Register" onClick={goToRegister} />
    </div>
  )
}
