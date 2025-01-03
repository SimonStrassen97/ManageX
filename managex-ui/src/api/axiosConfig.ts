import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../app/store"
import { logout } from "../features/auth/authSlice"

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Base URL for Django backend
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem("access_token")
    if (access_token) {
      config.headers.Authorization = `Bearer ${JSON.parse(access_token)}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle validation errors and token expiration
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error)
    }
  },
)

export default axiosInstance
