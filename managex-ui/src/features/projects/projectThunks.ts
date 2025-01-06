import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects, addProject } from "../../api/projectApi"
import { Project } from "./project-types"
import { FilterState } from "../filter/filter-types"
import { ProjectTransformer } from "../../utils/transforms"
import { handleThunkError } from "../../utils/error-handling"

// Define the async thunk for fetching projects with filters
export const fetchProjectsThunk = createAsyncThunk<
  Project[],
  FilterState,
  { rejectValue: string }
>(
  "projects/fetchFilteredProjects",
  async (filters: FilterState, { rejectWithValue }) => {
    try {
      const response = await fetchProjects(filters)
      const projects = ProjectTransformer.deserializeProjects(response.data)
      return projects
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue)
    }
  },
)

// Define the async thunk for adding a project
export const addProjectThunk = createAsyncThunk<Project, Project>(
  "projects/addProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      const response = await addProject(project)
      const newProject = ProjectTransformer.deserializeProject(response.data)
      return newProject
    } catch (error: any) {
      return handleThunkError(error, rejectWithValue)
    }
  },
)
