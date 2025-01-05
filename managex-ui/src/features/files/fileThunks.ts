import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosConfig"
import { ProjectFile } from "./file-types"
import { Project } from "../projects/project-types"
import { uploadFile, fetchProjectFiles } from "../../api/fileApi"

export const uploadFileThunk = createAsyncThunk<
  ProjectFile,
  ProjectFile,
  { rejectValue: string }
>("files/upload", async (projectFile, { rejectWithValue }) => {
  try {
    const file = await uploadFile(projectFile)
    return file
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to upload file",
    )
  }
})

export const fetchFilesThunk = createAsyncThunk<
  ProjectFile,
  string,
  { rejectValue: string }
>("files/fetch", async (project_number: string, { rejectWithValue }) => {
  try {
    const file = fetchProjectFiles(project_number)
    return file
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch files",
    )
  }
})
