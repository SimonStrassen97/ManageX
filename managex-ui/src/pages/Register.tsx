import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState, AppDispatch } from "../app/store"
import { authThunk } from "../features/auth/authThunks"
import {
  fetchCurrentUserThunk,
  registerUserThunk,
} from "../features/users/userThunks"
import { NewUser } from "../features/users/user-types"
import { Input, Button } from "../components"

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleRegister = async () => {
    const registerData: NewUser = {
      username,
      first_name,
      last_name,
      email,
      password,
    }
    const resultAction = await dispatch(registerUserThunk(registerData))
    if (authThunk.fulfilled.match(resultAction)) {
      await dispatch(fetchCurrentUserThunk())
      navigate("/home") // Redirect to home after successful login
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
        error={error}
      />
      <Input
        label="First Name"
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={e => setFirstName(e.target.value)}
        error={error}
      />
      <Input
        label="Last Name"
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={e => setLastName(e.target.value)}
        error={error}
      />
      <Input
        label="Last Name"
        type="email"
        placeholder="Last Name"
        value={last_name}
        onChange={e => setLastName(e.target.value)}
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
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={error}
      />
      <Button label="Login" onClick={handleRegister} />
      <Button label="Register" onClick={() => navigate("/register")} />
    </div>
  )
}
