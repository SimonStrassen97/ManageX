import axiosInstance from "./axiosConfig"
import {
  SerializedProjects,
  SerializedProjectState,
} from "./server-response-types"
import { ProjectState, Projects } from "../features/projects/project-types"
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
): Promise<Projects> => {
  const paramsObj = convertFilterStateToParams(filters)
  const params = new URLSearchParams(paramsObj).toString()

  const response = await axiosInstance.get<SerializedProjectState[]>(
    `api/projects/?${params}`,
  )
  // transform the response data to the ProjectState type
  const serializedProjects: SerializedProjects = { projects: response.data }
  return ProjectTransformer.deserializeProjects(serializedProjects)
}

export const addProject = async (
  project: ProjectState,
): Promise<ProjectState> => {
  // transform the project to the serialized format
  const serializedProject = ProjectTransformer.serializeProject(project)
  const response = await axiosInstance.post<SerializedProjectState>(
    "api/projects/create",
    serializedProject,
  )
  // transform the response data to the ProjectState type
  const deserializedProject = ProjectTransformer.deserializeProjects({
    projects: [response.data],
  }).projects[0]
  return deserializedProject
}
