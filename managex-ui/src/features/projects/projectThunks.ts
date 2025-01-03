import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects, addProject } from "../../api/projectApi"
import { Project } from "./project-types"
import { FilterState } from "../filter/filter-types"

// Define the async thunk for fetching projects with filters
export const fetchProjectsThunk = createAsyncThunk<
  Project[],
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
export const addProjectThunk = createAsyncThunk<Project, Project>(
  "projects/addProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      const newProject = await addProject(project)
      return newProject
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue("An unknown error occurred.")
      }
    }
  },
)
