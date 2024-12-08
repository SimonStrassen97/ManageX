import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project, ProjectState } from "./projectTypes"

// Define the initial state
const initialState: ProjectState = {
  projects: [], // Initialize as an empty array
}

// Create the slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Set all projects (replace the current list)
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload
    },
    // Add a single project to the list
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
    // Remove a project by ID
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter(
        project => project.project_number !== action.payload,
      )
    },
    // Update a project by ID
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        project => project.project_number === action.payload.project_number,
      )
      if (index !== -1) {
        state.projects[index] = action.payload
      }
    },
  },
})

// Named exports for the actions
export const { setProjects, addProject, removeProject, updateProject } =
  projectSlice.actions

// Named export for the reducer
export const projectReducer = projectSlice.reducer
