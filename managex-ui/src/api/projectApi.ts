import axiosInstance from "./axiosConfig"
import { SerializedProject } from "./server-response-types"
import { Project } from "../features/projects/project-types"
import { ProjectTransformer } from "../utils/transforms"
import { FilterState } from "../features/filter/filter-types"

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

export const fetchProjects = async (
  filters: FilterState,
): Promise<Project[]> => {
  const paramsObj = convertFilterStateToParams(filters)
  const params = new URLSearchParams(paramsObj).toString()

  const response = await axiosInstance.get<SerializedProject[]>(
    `api/projects/?${params}`,
  )
  // transform the response data to the ProjectState type
  return ProjectTransformer.deserializeProjects(response.data)
}

export const addProject = async (project: Project): Promise<Project> => {
  // transform the project to the serialized format
  const serializedProject = ProjectTransformer.serializeProject(project)
  const response = await axiosInstance.post<SerializedProject>(
    "api/projects/create/",
    serializedProject,
  )
  // transform the response data to the ProjectState type
  return ProjectTransformer.deserializeProject(response.data)
}
