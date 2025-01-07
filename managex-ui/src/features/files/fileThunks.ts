// src/features/files/fileThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadFile, fetchProjectFile } from "../../api/fileApi";
import { ProjectFile, ProjectFileUpload } from "./file-types";
import { handleError, AppError } from "../../utils/error-handling";
import { FileTransformer } from "../../utils/transforms";
import { SerializedProjectFile } from "../../api/server-response-types";

// Define the async thunk for uploading a file
export const uploadFileThunk = createAsyncThunk<
  SerializedProjectFile,
  ProjectFileUpload,
  { rejectValue: AppError }
>("files/upload", async (projectFileUpload, { rejectWithValue }) => {
  try {
    const serializedProjectFileUpload = FileTransformer.serializeFile(projectFileUpload);
    const response = await uploadFile(serializedProjectFileUpload);
    const serializedFile: SerializedProjectFile = response.data;
    const file = FileTransformer.deserializeFile(serializedFile);
    return file;
  } catch (error: any) {
    return handleError(error, rejectWithValue);
  }
});

// Define the async thunk for fetching a project file
export const fetchFileThunk = createAsyncThunk<
  ProjectFile,
  string,
  { rejectValue: AppError }
>("files/fetch", async (project_number: string, { rejectWithValue }) => {
  try {
    const response = await fetchProjectFile(project_number);

    const serializedFile: SerializedProjectFile = response.data;
    const file = FileTransformer.deserializeFile(serializedFile);
    return file;
  } catch (error: any) {
    return handleError(error, rejectWithValue);
  }
});