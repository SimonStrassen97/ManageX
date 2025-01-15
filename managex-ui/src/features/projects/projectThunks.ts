import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchProjects,
  addProject,
  checkProjectNumberAvailability,
  fetchStatusList,
} from "../../api/projectApi"
import { Project, Status } from "../../types/project-types"
import { FilterState } from "../../types/filter-types"
import { ProjectTransformer, StatusTransformer } from "../../utils/transforms"
import { handleError, AppError } from "../../utils/error-handling"

// Define the async thunk for fetching projects with filters
export const fetchProjectsThunk = createAsyncThunk<
  Project[],
  FilterState,
  { rejectValue: AppError }
>(
  "projects/fetchFilteredProjects",
  async (filters: FilterState, { rejectWithValue }) => {
    try {
      const response = await fetchProjects(filters)
      const projects = ProjectTransformer.deserializeProjects(response.data)
      return projects
    } catch (error: any) {
      return handleError(error, rejectWithValue)
    }
  },
)

// Define the async thunk for adding a project
export const addProjectThunk = createAsyncThunk<
  Project,
  Project,
  { rejectValue: AppError }
>("projects/addProject", async (project: Project, { rejectWithValue }) => {
  try {
    const response = await addProject(project)
    const newProject = ProjectTransformer.deserializeProject(response.data)
    return newProject
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})

export const checkProjectNumberAvailabilityThunk = createAsyncThunk<
  boolean,
  string,
  { rejectValue: AppError }
>(
  "projects/checkProjectNumberAvailability",
  async (projectNumber: string, { rejectWithValue }) => {
    try {
      const response = await checkProjectNumberAvailability(projectNumber)
      return response.data.available
    } catch (error: any) {
      return handleError(error, rejectWithValue)
    }
  },
)

export const fetchStatusListThunk = createAsyncThunk<
  Status[],
  void,
  { rejectValue: AppError }
>("statuses/fetchStatusList", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchStatusList()
    const statuses = StatusTransformer.deserializeStatuses(response.data)
    return statuses
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})
