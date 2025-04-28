import axiosInstance from "./axiosConfig"
import { ProjectResponse, StatusResponse } from "../types/server-response-types"
import { Project } from "../types/project-types"
import { FilterState } from "../types/filter-types"
import { ProjectTransformer } from "../utils/transforms"
import { KanbanOrder } from "../types/kanban-types"
import {
  AddProjectRequest,
  PartialProjectUpdate,
} from "../types/server-request-types"

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
  return await axiosInstance.get<ProjectResponse[]>(`api/projects/?${params}`)
}

export const addProject = async (new_project: AddProjectRequest) => {
  return await axiosInstance.post<ProjectResponse>(
    "api/projects/create/",
    new_project,
  )
}

export const checkProjectNumberAvailability = async (projectNumber: string) => {
  return await axiosInstance.get(`/api/projects/check/${projectNumber}/`)
}
export const fetchStatusList = async () => {
  return await axiosInstance.get<StatusResponse[]>("/api/status/")
}

export const updateProject = async (
  project_id: number,
  updates: PartialProjectUpdate,
) => {
  return await axiosInstance.patch(
    `/api/projects/update/${project_id}/`,
    updates,
  )
}

export const fetchKanbanOrder = async () => {
  return await axiosInstance.get<KanbanOrder>("/api/kanban-order/")
}

export const updateKanbanOrder = async (order: KanbanOrder) => {
  return await axiosInstance.put("/api/kanban-order/update/", order)
}
