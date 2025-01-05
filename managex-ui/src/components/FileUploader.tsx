import React from "react"
import { ErrorMessage } from "./ErrorMessage"
import { ProjectFile } from "../features/files/file-types"

interface FileUploadProps {
  accept: string
  multiple?: boolean
  onFileChange: (file: File | null) => void
  error?: string
}

export const FileUploader: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  onFileChange,
  error,
}) => {
  return (
    <div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={e => {
          const files = e.target.files
          if (files) {
            onFileChange(files[0])
          }
        }}
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}
