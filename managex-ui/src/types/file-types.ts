import { AppError } from "../utils/error-handling"

export interface ProjectFileUpload {
  project_number: string
  file: File | null
}

export interface ProjectFile {
  id: number
  project_number: string;
  file: string; // File object for uploading
  filename: string
  DATECREATE: string
}

export interface FilesState {
  files: ProjectFile[]
  loading: boolean
  error: AppError | null
}