import axiosInstance from "./axiosConfig"
import { ProjectFileResponse } from "../types/server-response-types"
import { UploadFileRequest } from "../types/server-request-types"

export const uploadFile = async (projectFile: UploadFileRequest) => {
  return await axiosInstance.post<ProjectFileResponse>(
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
  return await axiosInstance.get<ProjectFileResponse>(
    `/api/files/${project_number}/`,
  )
}
