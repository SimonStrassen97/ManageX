export const handleThunkError = (
  error: any,
  rejectWithValue: (value: string) => any,
) => {
  if (error.response && error.response.data) {
    // API error
    return rejectWithValue(error.response.data.detail || "An error occurred.")
  } else if (error.message) {
    // Client-side/network error
    console.error("Network or client-side error:", error.message)
    return rejectWithValue(
      error.message || "A network error occurred. Please try again.",
    )
  } else {
    // Unknown error
    console.error("Unknown error:", error)
    return rejectWithValue("An unknown error occurred.")
  }
}
