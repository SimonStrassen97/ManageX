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
  const { error: authError } = useSelector((state: RootState) => state.auth)
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleLogin = async () => {
    const loginData: LoginData = { username, password };
    try {
      const authResult = await dispatch(authThunk(loginData)).unwrap();
      try {
        const fetchUserResult = await dispatch(fetchCurrentUserThunk()).unwrap();
        navigate("/home"); // Redirect to home after successful login and fetching current user
      } catch (fetchUserError) {
        setGeneralError("Failed to fetch current user. Please try again later.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error) {
        setGeneralError(error.message); // Handle the login error (e.g., show an error message to the user)
      } else {
        setGeneralError("An unknown error occurred.");
      }
    }
  };

  const goToRegister = () => {
    navigate("/register")
  }

  const closeGeneralError = () => {
    setGeneralError(null);
  };

  return (
    <div>
      <h2>Login</h2>
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        error={authError}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={authError}
      />
      <Button label="Login" onClick={handleLogin} />
      <Button label="Register" onClick={goToRegister} />

      {generalError && (
        <div className="error-popup">
          <p>{generalError}</p>
          <button onClick={closeGeneralError}>Close</button>
        </div>
      )}
    </div>
  )
}
