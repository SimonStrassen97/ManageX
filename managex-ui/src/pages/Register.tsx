import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState, AppDispatch } from "../app/store"
import { authThunk } from "../features/auth/authThunks"
import {
  fetchCurrentUserThunk,
  registerUserThunk,
} from "../features/users/userThunks"
import { Input, Button } from "../components"
import { validateNewUser } from "../features/users/userValidator"

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})

  const handleInputChange = (
    value: string,
    setter: (value: string) => void,
  ) => {
    const noSpaces = value.replace(/\s/g, "")
    setter(noSpaces)
  }

  const handleRegister = async () => {
    const registerData = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
    }

    const errors = validateNewUser(registerData)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    const resultAction = await dispatch(registerUserThunk(registerData))
    if (registerUserThunk.fulfilled.match(resultAction)) {
      await dispatch(fetchCurrentUserThunk())
      navigate("/home")
    }
  }

  const goToLogin = () => {
    navigate("/login")
  }

  return (
    <div>
      <h2>Register</h2>
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => handleInputChange(e.target.value, setUsername)}
        error={validationErrors.username}
      />
      <Input
        label="First Name"
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={e => handleInputChange(e.target.value, setFirstName)}
        error={validationErrors.first_name}
      />
      <Input
        label="Last Name"
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={e => handleInputChange(e.target.value, setLastName)}
        error={validationErrors.last_name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => handleInputChange(e.target.value, setEmail)}
        error={validationErrors.email}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => handleInputChange(e.target.value, setPassword)}
        error={validationErrors.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => handleInputChange(e.target.value, setConfirmPassword)}
        error={validationErrors.confirmPassword}
      />
      <Button label="Register" onClick={handleRegister} />
      <Button label="Back to Login" onClick={goToLogin} />
    </div>
  )
}
