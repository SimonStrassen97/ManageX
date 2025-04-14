import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../../app/store"
import { fetchCurrentUserThunk, registerUserThunk } from "../users/userThunks"
import { Input, Button } from "../../components"
import { validateNewUser } from "../users/userValidator"

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
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => handleInputChange(e.target.value, setUsername)}
            error={validationErrors.username}
          />
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={first_name}
            onChange={e => handleInputChange(e.target.value, setFirstName)}
            error={validationErrors.first_name}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={last_name}
            onChange={e => handleInputChange(e.target.value, setLastName)}
            error={validationErrors.last_name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => handleInputChange(e.target.value, setEmail)}
            error={validationErrors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => handleInputChange(e.target.value, setPassword)}
            error={validationErrors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e =>
              handleInputChange(e.target.value, setConfirmPassword)
            }
            error={validationErrors.confirmPassword}
          />
          <Button
            label="Register"
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          />
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={goToLogin}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
