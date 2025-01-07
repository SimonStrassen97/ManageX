import axiosInstance from "./axiosConfig"
import { SerializedProjectFile } from "./server-response-types"
import { ProjectFileUpload } from "../features/files/file-types"

export const uploadFile = async (projectFile: ProjectFileUpload) => {
  return await axiosInstance.post<SerializedProjectFile>(
    "/api/files/upload/",
    projectFile,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  )
}

export const fetchProjectFile = async (project_number: string) => {
  return await axiosInstance.get<SerializedProjectFile>(`/api/files/${project_number}/`)
}
