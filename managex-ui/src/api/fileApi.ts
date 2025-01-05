import axiosInstance from "./axiosConfig"
import { ProjectFile } from "../features/files/file-types"

export const uploadFile = async (
  ProjectFile: ProjectFile,
): Promise<ProjectFile> => {
  const response = await axiosInstance.post<ProjectFile>(
    "/api/files/upload/",
    ProjectFile,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
  return response.data
}

export const fetchProjectFiles = async (
  project_number: string,
): Promise<ProjectFile> => {
  const response = await axiosInstance.get<ProjectFile>(
    `/api/files/${project_number}/`,
  )
  return response.data
}
