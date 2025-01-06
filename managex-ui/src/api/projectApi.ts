import axiosInstance from "./axiosConfig"
import { SerializedProject } from "./server-response-types"
import { Project } from "../features/projects/project-types"
import { FilterState } from "../features/filter/filter-types"
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
