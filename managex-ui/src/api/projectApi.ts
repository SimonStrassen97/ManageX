import axiosInstance from "./axiosConfig"
import { SerializedProject, SerializedStatus } from "../types/server-response-types"
import { Project } from "../types/project-types"
import { FilterState } from "../types/filter-types"
import { ProjectTransformer } from "../utils/transforms"

// Utility function to convert FilterState to query parameters
const convertFilterStateToParams = (
  filters: FilterState,
): { [key: string]: string } => {
  return {
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status,
  }
}

export const fetchProjects = async (filters: FilterState) => {
  const paramsObj = convertFilterStateToParams(filters)
  const params = new URLSearchParams(paramsObj).toString()
  return await axiosInstance.get<SerializedProject[]>(`api/projects/?${params}`)
}

export const addProject = async (project: Project) => {
  const serializedProject = ProjectTransformer.serializeProject(project)
  return await axiosInstance.post<SerializedProject>(
    "api/projects/create/",
    serializedProject,
  )
}

export const checkProjectNumberAvailability = async (projectNumber: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/projects/check/${projectNumber}/`,
    )
    const isAvailable = !response.data.exists
    return isAvailable // Return true if the project number is available
  } catch (error) {
    console.error("Error checking project number availability:", error)
    return false // Return false if there is an error
  }
}

export const fetchStatusList = async () => {
  return await axiosInstance.get<SerializedStatus[]>("/api/status/")
}
