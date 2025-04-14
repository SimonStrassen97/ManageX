import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { Project } from "../../types/project-types"
import {
  addProjectThunk,
  checkProjectNumberAvailabilityThunk,
} from "./projectThunks"
import { DatePicker, Button, Dropdown, Input } from "../../components"
import { dateToString, stringToDate } from "../../utils/transforms"
import { validateProject } from "./projectValidator"
import { FileUploader } from "../../components/FileUploader"
import {
  UploadFileRequest,
  AddProjectRequest,
} from "../../types/server-request-types"
import { uploadFileThunk } from "../files/fileThunks"
import { fetchUsersThunk } from "../users/userThunks"
import { fetchStatusListThunk } from "../projects/projectThunks"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialFormData: AddProjectRequest = {
  project_number: "",
  project_name: "",
  project_lead_id: 1,
  project_status_id: 1,
  confirmed_project_status_id: null,
  timeline: {
    start_date: dateToString(new Date())!,
    order_date: "",
    acceptance_date: "",
    delivery_date: "",
    finish_date: dateToString(new Date())!,
  },
  budget: {
    amount: 0,
    approval_date: null,
    currency_id: 1,
  },
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const [formData, setFormData] = useState<AddProjectRequest>(initialFormData)
  const [investFile, setInvestFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const users = useSelector((state: RootState) => state.users.users)
  const statuses = useSelector((state: RootState) => state.status.statuses)

  //probably not needed since already in store. (maybe not yet but should be upon app start)
  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchStatusListThunk())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = await validateProject(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await dispatch(addProjectThunk(formData))
      const uploadFile: UploadFileRequest = {
        file: investFile || null,
        project_number: formData.project_number,
      }
      //await dispatch(uploadFileThunk(uploadFile))
      //setFormData(initialFormData)
      onClose()
    } catch (error) {
      console.error("Error adding project:", error)
    }
  }

  const handleClose = () => {
    setFormData(initialFormData)
    setInvestFile(null)
    setErrors({})
    onClose()
  }

  if (!isOpen) return null
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Project Number"
            type="text"
            value={formData.project_number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData(prev => ({
                ...prev,
                project_number: e.target.value,
              }))
            }
            error={errors.project_number}
          />
          <Input
            label="Project Name"
            type="text"
            value={formData.project_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData(prev => ({
                ...prev,
                project_name: e.target.value,
              }))
            }
            error={errors.project_name}
          />
          <Dropdown
            label="Project Lead"
            value={
              users.find(user => user.id === formData.project_lead_id)
                ?.username || ""
            }
            options={users.map(user => user.username)}
            disable_all={true}
            onChange={(username: string) => {
              const selectedUser = users.find(
                user => user.username === username,
              )
              setFormData(prev => ({
                ...prev,
                project_lead_id: selectedUser
                  ? selectedUser.id
                  : prev.project_lead_id,
              }))
            }}
            error={errors.project_lead}
          />
          <Dropdown
            label="Project Status"
            value={
              statuses.find(
                status => status.status_id === formData.project_status_id,
              )?.status_label || ""
            }
            options={statuses.map(status => status.status_label)}
            onChange={(status_label: string) => {
              const selectedStatus = statuses.find(
                status => status.status_label === status_label,
              )
              setFormData(prev => ({
                ...prev,
                project_status_id: selectedStatus
                  ? selectedStatus.status_id
                  : prev.project_status_id,
              }))
            }}
            error={errors.project_status}
          />
          <DatePicker
            label="Start Date"
            value={formData.timeline.start_date}
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  start_date: date,
                },
              }))
            }
            required
            error={errors.start_date}
          />
          {/* Add other form fields here */}
          <div className="modal-actions">
            <Button label="Add Project" type="submit" className="bg-blue-600" />
            <Button label="Cancel" type="button" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  )
}
