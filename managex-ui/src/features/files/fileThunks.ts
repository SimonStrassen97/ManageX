import { createAsyncThunk } from "@reduxjs/toolkit"
import { uploadFile, fetchProjectFiles } from "../../api/fileApi"
import { ProjectFile } from "./file-types"
import { handleThunkError } from "../../utils/error-handling"

// Define the async thunk for uploading a file
export const uploadFileThunk = createAsyncThunk<
  ProjectFile,
  ProjectFile,
  { rejectValue: string }
>("files/upload", async (projectFile, { rejectWithValue }) => {
  try {
    const response = await uploadFile(projectFile)
    return response.data
  } catch (error: any) {
    return handleThunkError(error, rejectWithValue)
  }
})

// Define the async thunk for fetching project files
export const fetchFilesThunk = createAsyncThunk<
  ProjectFile,
  string,
  { rejectValue: string }
>("files/fetch", async (project_number: string, { rejectWithValue }) => {
  try {
    const response = await fetchProjectFiles(project_number)
    return response.data
  } catch (error: any) {
    return handleThunkError(error, rejectWithValue)
  }
})
