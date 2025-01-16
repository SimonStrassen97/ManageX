// src/features/files/fileThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { uploadFile, fetchProjectFile } from "../../api/fileApi"
import { ProjectFile } from "../../types/file-types"
import { handleError, AppError } from "../../utils/error-handling"
import { FileTransformer } from "../../utils/transforms"
import { ProjectFileResponse } from "../../types/server-response-types"
import { UploadFileRequest } from "../../types/server-request-types"

// Define the async thunk for uploading a file
export const uploadFileThunk = createAsyncThunk<
  ProjectFileResponse,
  UploadFileRequest,
  { rejectValue: AppError }
>("files/upload", async (projectFileUpload, { rejectWithValue }) => {
  try {
    const response = await uploadFile(projectFileUpload)
    const serializedFile: ProjectFileResponse = response.data
    const file = FileTransformer.fromServer(serializedFile)
    return file
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})

// Define the async thunk for fetching a project file
export const fetchFileThunk = createAsyncThunk<
  ProjectFile,
  string,
  { rejectValue: AppError }
>("files/fetch", async (project_number: string, { rejectWithValue }) => {
  try {
    const response = await fetchProjectFile(project_number)

    const serializedFile: ProjectFileResponse = response.data
    const file = FileTransformer.fromServer(serializedFile)
    return file
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})
