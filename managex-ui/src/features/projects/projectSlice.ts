import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchProjectsThunk, addProjectThunk } from "./projectThunks"
import { ProjectsState } from "./project-types"

// Define the initial state
const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
}

// Create the slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProjectsThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload
        state.error = null
      })
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addProjectThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addProjectThunk.fulfilled, (state, action) => {
        state.loading = false
        state.projects.push(action.payload)
        state.error = null
      })
      .addCase(addProjectThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const projectReducer = projectSlice.reducer
