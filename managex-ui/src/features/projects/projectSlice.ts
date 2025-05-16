import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  fetchProjectsThunk,
  addProjectThunk,
  fetchStatusListThunk,
  updateProjectThunk,
  fetchCurrencyListThunk,
} from "./projectThunks"
import {
  Project,
  Status,
  Currency,
  ProjectsState,
  StatusState,
  CurrencyState,
} from "../../types/project-types"
import { AppError } from "../../utils/error-handling"

// Define the initial state
const initialProjectState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
}

// Create the slice
const projectSlice = createSlice({
  name: "projects",
  initialState: initialProjectState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjectsThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchProjectsThunk.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.loading = false
          state.projects = action.payload
          state.error = null
        },
      )
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as AppError
      })
      .addCase(addProjectThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        addProjectThunk.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false
          state.projects.push(action.payload)
          state.error = null
        },
      )
      .addCase(addProjectThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as AppError
      })

      .addCase(updateProjectThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        updateProjectThunk.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false
          state.error = null
          const updatedProject = action.payload
          const index = state.projects.findIndex(
            project => project.project_id === updatedProject.project_id,
          )
          if (index !== -1) {
            state.projects[index] = updatedProject
          }
        },
      )
      .addCase(updateProjectThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as AppError
      })
  },
})

export const projectReducer = projectSlice.reducer

const initialStatusState: StatusState = {
  statuses: [],
  loading: false,
  error: null,
}

const statusSlice = createSlice({
  name: "statuses",
  initialState: initialStatusState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatusListThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchStatusListThunk.fulfilled,
        (state, action: PayloadAction<Status[]>) => {
          state.loading = false
          state.statuses = action.payload
        },
      )
      .addCase(fetchStatusListThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch statuses"
      })
  },
})

export const statusReducer = statusSlice.reducer

const initialCurrencyState: CurrencyState = {
  currencies: [],
  loading: false,
  error: null,
}
const currencySlice = createSlice({
  name: "currencies",
  initialState: initialCurrencyState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyListThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCurrencyListThunk.fulfilled,
        (state, action: PayloadAction<Currency[]>) => {
          state.loading = false
          state.currencies = action.payload
        },
      )
      .addCase(fetchCurrencyListThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch currencies"
      })
  },
})

export const currencyReducer = currencySlice.reducer
