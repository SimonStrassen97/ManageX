import axiosInstance from "./axiosConfig"
import { ProjectFile } from "../features/files/file-types"

export const uploadFile = async (projectFile: ProjectFile) => {
  return await axiosInstance.post<ProjectFile>(
    "/api/files/upload/",
    projectFile,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
}

export const fetchProjectFiles = async (project_number: string) => {
  return await axiosInstance.get<ProjectFile>(`/api/files/${project_number}/`)
}
