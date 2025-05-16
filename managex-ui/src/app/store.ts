import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../features/auth/authSlice"
import { filterReducer } from "../features/filter/filterSlice"
import {
  currencyReducer,
  projectReducer,
  statusReducer,
} from "../features/projects/projectSlice"
import { usersReducer, currentUserReducer } from "../features/users/userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,
    users: usersReducer,
    status: statusReducer,
    currencies: currencyReducer,
    currentuser: currentUserReducer,
    projects: projectReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), // Default middleware for async logic
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store // Add this line to export AppStore
