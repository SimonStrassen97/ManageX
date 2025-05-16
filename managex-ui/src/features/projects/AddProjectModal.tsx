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
import {
  fetchStatusListThunk,
  fetchCurrencyListThunk,
  updateProjectThunk,
} from "../projects/projectThunks"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project?: Project | null
  mode: "add" | "edit"
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

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  mode,
}) => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const [formData, setFormData] = useState<AddProjectRequest>(initialFormData)
  const [investFile, setInvestFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  //probably not needed since already in store. (maybe not yet but should be upon app start)
  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchStatusListThunk())
    dispatch(fetchCurrencyListThunk())
  }, [dispatch])

  const users = useSelector((state: RootState) => state.users.users)
  const statuses = useSelector((state: RootState) => state.status.statuses)
  const currencies = useSelector(
    (state: RootState) => state.currencies.currencies,
  )

  useEffect(() => {
    if (mode === "edit" && project) {
      const user = users.find(
        user => user.username === project.project_info.project_lead,
      )
      const status = statuses.find(
        status => status.status_label === project.project_info.project_status,
      )
      const confirmed_status = statuses.find(
        status =>
          status.status_label === project.project_info.confirmed_project_status,
      )
      const currency_id = currencies.find(
        currency => currency.currency_label === project.budget?.currency_label,
      )

      setFormData({
        project_number: project.project_info.project_number,
        project_name: project.project_info.project_name,
        project_lead_id: user ? user.id : 1,
        project_status_id: status ? status.status_id : 1,
        confirmed_project_status_id: confirmed_status
          ? confirmed_status.status_id
          : null,
        timeline: { ...project.timeline },
        budget: {
          amount: project.budget?.amount || 0,
          approval_date: project.budget?.approval_date
            ? project.budget.approval_date
            : null,
          currency_id: currency_id ? currency_id.currency_id : 1,
        },
      })
    } else {
      setFormData(initialFormData)
    }
    setErrors({})
    setInvestFile(null)
  }, [project, mode, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = await validateProject(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      if (mode === "edit" && project) {
        await dispatch(
          updateProjectThunk({
            project_id: project.project_id,
            updates: formData,
          }),
        )
        onClose()
      } else {
        await dispatch(addProjectThunk(formData))
        const uploadFile: UploadFileRequest = {
          file: investFile || null,
          project_number: formData.project_number,
        }
        //await dispatch(uploadFileThunk(uploadFile))
        //setFormData(initialFormData)
        onClose()
      }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-gray-300 rounded-lg shadow-lg p-8 text-gray-500 min-w-[400px]">
        <h2 className="text-xl text-gray-500 font-bold mb-4">
          {mode === "edit" ? "Edit Project" : "Add New Project"}
        </h2>
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
                project_status: selectedStatus
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
          <DatePicker
            label="Finish Date"
            value={formData.timeline.finish_date}
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  finish_date: date,
                },
              }))
            }
            required
            error={errors.finish_date}
          />
          {/* Add other form fields here */}
          <div className="flex gap-2 mt-6">
            <Button
              label={mode === "edit" ? "Save Changes" : "Add Project"}
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
            <Button
              label="Cancel"
              type="button"
              onClick={handleClose}
              className="bg-gray-400 text-white hover:bg-gray-500"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
