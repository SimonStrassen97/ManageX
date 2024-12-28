import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../app/store"
import { loginThunk } from "../features/auth/authThunks"
import { useNavigate } from "react-router-dom"
import { LoginData } from "../features/auth/auth-types"
import { Input, Button } from "../components"

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      const loginData: LoginData = { username, password }
      dispatch(loginThunk(loginData))
      navigate("/home") // Redirect to home after successful login
    } catch (err) {
      setError("Invalid credentials")
    }
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
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button label="Login" onClick={handleLogin} />
      {error && <p>{error}</p>}
    </div>
  )
}
