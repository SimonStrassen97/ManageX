import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../features/auth/authSlice"
import { filterReducer } from "../features/filter/filterSlice"
import { projectReducer } from "../features/projectList/projectSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,
    projects: projectReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), // Default middleware for async logic
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
