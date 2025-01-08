import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  fetchProjectsThunk,
  addProjectThunk,
  fetchStatusListThunk,
} from "./projectThunks"
import { Project, Status, ProjectsState, StatusState } from "./project-types"
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
