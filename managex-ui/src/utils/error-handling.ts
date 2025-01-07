export interface AppError {
  type: 'auth' | 'validation' | 'network' | 'api' | 'client' | 'general'; // Add more types as needed
  message: string; // User-friendly error message
  code?: string | number; // Optional: API error code or status code
  details?: any; // Optional: Additional details for debugging (e.g., stack trace)
}

export const handleError = (
  error: any,
  rejectWithValue: (value: AppError) => any
) => {
  let appError: AppError;

  if (error.response && error.response.data) {
    // API error
    const status = error.response.status;
    const message = error.response.data.detail || "An error occurred.";

    if (status === 401 || status === 403) {
      // Authentication error
      appError = {
        type: "auth",
        message: message,
        code: status,
        details: error.response.data,
      };
    } else {
      // Other API error
      appError = {
        type: "api",
        message: message,
        code: status,
        details: error.response.data,
      };
    }
  } else if (error.request) {
    // Network error
    console.error("Network error:", error.message);
    appError = {
      type: "network",
      message: "A network error occurred. Please check your connection and try again.",
      details: error.message,
    };
  } else if (error.message) {
    // Client-side error
    console.error("Client-side error:", error.message);
    appError = {
      type: "client",
      message: error.message || "A client-side error occurred. Please try again.",
      details: error.stack,
    };
  } else {
    // Unknown error
    console.error("Unknown error:", error);
    appError = {
      type: "general",
      message: "An unknown error occurred.",
      details: error,
    };
  }

  return rejectWithValue(appError);
};