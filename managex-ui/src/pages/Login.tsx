// src/pages/Login.tsx
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      dispatch(login("user"))
      navigate("/home") // Redirect to home after successful login
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
