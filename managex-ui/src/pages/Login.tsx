import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState, AppDispatch } from "../app/store"
import { authThunk } from "../features/auth/authThunks"
import { fetchCurrentUserThunk } from "../features/users/userThunks"
import { LoginData } from "../features/auth/auth-types"
import { Input, Button } from "../components"

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleLogin = async () => {
    const loginData: LoginData = { username, password }
    const resultAction = await dispatch(authThunk(loginData))
    if (authThunk.fulfilled.match(resultAction)) {
      await dispatch(fetchCurrentUserThunk())
      navigate("/home") // Redirect to home after successful login
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
        error={error}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={error}
      />
      <Button label="Login" onClick={handleLogin} />
      <Button label="Register" onClick={goToRegister} />
    </div>
  )
}
