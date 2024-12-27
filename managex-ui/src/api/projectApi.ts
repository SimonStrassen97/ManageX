import axiosInstance from "./axiosConfig"
import {
  SerializedProjects,
  SerializedProjectState,
} from "./server-response-types"
import { ProjectState, Projects } from "../features/projects/project-types"
import { ProjectTransformer } from "../utils/transforms"

export const fetchProjects = async (
  filters: { [key: string]: string } = {},
): Promise<Projects> => {
  const params = new URLSearchParams(filters).toString()
  const response = await axiosInstance.get<SerializedProjectState[]>(
    `api/projects/?${params}`,
  )
  const serializedProjects: SerializedProjects = { projects: response.data }
  return ProjectTransformer.deserializeProjects(serializedProjects)
}

export const addProject = async (
  project: ProjectState,
): Promise<ProjectState> => {
  const serializedProject = ProjectTransformer.serializeProject(project)
  const response = await axiosInstance.post<SerializedProjectState>(
    "api/projects/",
    serializedProject,
  )
  const deserializedProject = ProjectTransformer.deserializeProjects({
    projects: [response.data],
  }).projects[0]
  return deserializedProject
}
