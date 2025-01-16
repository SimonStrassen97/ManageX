import { AppError } from "../utils/error-handling"

export interface ProjectFile {
  file_id: number
  project_number: string
  file: string // File object for uploading
  filename: string
  date_created: string
}

export interface FilesState {
  files: ProjectFile[]
  loading: boolean
  error: AppError | null
}
