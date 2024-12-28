import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects, addProject } from "../../api/projectApi"
import { Projects, ProjectState } from "./project-types"
import { FilterState } from "../filter/filter-types"

// Define the async thunk for fetching projects with filters
export const fetchProjectsThunk = createAsyncThunk<
  Projects,
  FilterState,
  { rejectValue: string }
>(
  "projects/fetchFilteredProjects",
  async (filters: FilterState, { rejectWithValue }) => {
    try {
      const projects = await fetchProjects(filters)
      return projects
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch projects")
      } else {
        return rejectWithValue(
          "An unknown error occurred while fetching projects",
        )
      }
    }
  },
)

// Define the async thunk for adding a project
export const addProjectThunk = createAsyncThunk<ProjectState, ProjectState>(
  "projects/addProject",
  async (project: ProjectState, { rejectWithValue }) => {
    try {
      const newProject = await addProject(project)
      return newProject
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to add project")
      } else {
        return rejectWithValue(
          "An unknown error occurred while adding the project",
        )
      }
    }
  },
)
