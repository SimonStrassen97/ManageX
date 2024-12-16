import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Projects, ProjectState } from "./project-types"

// Define the initial state
const initialState: Projects = {
  projects: [], // Initialize as an empty array
}

// Create the slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Projects>) => {
      state.projects = action.payload.projects
    },
    // Add a single project to the list
    addProject: (state, action: PayloadAction<ProjectState>) => {
      state.projects.push(action.payload)
    },
    // Remove a project by ID
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        project => project.project_number !== action.payload,
      )
    },
    // Update a project by ID
    updateProject: (state, action: PayloadAction<ProjectState>) => {
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
