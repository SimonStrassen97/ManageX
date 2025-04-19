import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchProjects,
  addProject,
  updateProject,
  checkProjectNumberAvailability,
  fetchStatusList,
} from "../../api/projectApi"
import { Project, Status } from "../../types/project-types"
import { FilterState } from "../../types/filter-types"
import { ProjectTransformer, StatusTransformer } from "../../utils/transforms"
import { handleError, AppError } from "../../utils/error-handling"
import {
  AddProjectRequest,
  PartialProjectUpdate,
} from "../../types/server-request-types"

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
      const projects = ProjectTransformer.fromServer(response.data)
      return projects
    } catch (error: any) {
      return handleError(error, rejectWithValue)
    }
  },
)

// Define the async thunk for adding a project
export const addProjectThunk = createAsyncThunk<
  Project,
  AddProjectRequest,
  { rejectValue: AppError }
>(
  "projects/addProject",
  async (project: AddProjectRequest, { rejectWithValue }) => {
    try {
      const response = await addProject(project)
      const newProject = ProjectTransformer.fromServer(response.data)
      return newProject
    } catch (error: any) {
      return handleError(error, rejectWithValue)
    }
  },
)

export const updateProjectThunk = createAsyncThunk<
  Project,
  { project_id: number; updates: PartialProjectUpdate },
  { rejectValue: AppError }
>(
  "projects/updateProject",
  async ({ project_id, updates }, { rejectWithValue }) => {
    try {
      const response = await updateProject(project_id, updates)
      const updatedProject = ProjectTransformer.fromServer(response.data)
      return updatedProject
    } catch (error: any) {
      return handleError(error, rejectWithValue)
    }
  },
)

export const checkProjectNumberAvailabilityThunk = createAsyncThunk<
  boolean,
  string,
  { rejectValue: AppError }
>(
  "projects/checkProjectNumberAvailability",
  async (projectNumber: string, { rejectWithValue }) => {
    try {
      const response = await checkProjectNumberAvailability(projectNumber)
      const isAvailable = !response.data.exists
      return isAvailable // Return true if the project number is available
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
    const statuses = StatusTransformer.fromServer(response.data)
    return statuses
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})
