import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../features/auth/authSlice"
import { filterReducer } from "../features/filter/filterSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer, // Only include the auth slice
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), // Default middleware for async logic
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
