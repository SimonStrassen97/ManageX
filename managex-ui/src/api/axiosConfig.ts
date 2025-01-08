import axios from "axios"

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
      config.headers.Authorization = `Bearer ${access_token}`
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
      // Handle server-side errors
      console.error("Response error:", error.response)
    } else {
      // Handle network or other unexpected errors
      console.error("Network or unexpected error:", error.message)
    }
    return Promise.reject(error) // Propagate the error
  },
)

export default axiosInstance
