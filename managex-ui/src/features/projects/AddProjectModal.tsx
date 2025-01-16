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
  project_info: {
    project_name: "",
    project_lead: localStorage.getItem("user") || "",
    project_status: "planned",
    confirmed_project_status: "",
  },
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
    currency: {
      currency_label: "CHF",
    },
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

  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchStatusListThunk())
  }, [dispatch])

  const ACCEPTED_TYPES =
    ".pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"

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
            value={formData.project_info?.project_name || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData(prev => ({
                ...prev,
                project_info: {
                  ...prev.project_info,
                  project_name: e.target.value,
                },
              }))
            }
            error={errors.project_name}
          />
          <Dropdown
            label="Project Lead"
            value={formData.project_info?.project_lead || ""}
            options={users.map(user => user.username)}
            disable_all={true}
            onChange={(project_lead: string) =>
              setFormData(prev => ({
                ...prev,
                project_info: {
                  ...prev.project_info,
                  project_lead,
                },
              }))
            }
            error={errors.project_lead}
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
            label="Acceptance Date"
            value={formData.timeline.acceptance_date as string}
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  acceptance_date: date,
                },
              }))
            }
            required
            error={errors.acceptance_date}
          />
          <DatePicker
            label="Order Date"
            value={formData.timeline.order_date as string}
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  order_date: date,
                },
              }))
            }
            required
            error={errors.order_date}
          />
          <DatePicker
            label="Delivery Date"
            value={formData.timeline.delivery_date as string}
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  delivery_date: date,
                },
              }))
            }
            error={errors.delivery_date}
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
            error={errors.finish_date}
          />
          <Input
            label="Budget Amount"
            type="number"
            value={formData.budget?.amount || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData(prev => ({
                ...prev,
                budget: {
                  ...prev.budget,
                  approval_date: prev.budget?.approval_date || null,
                  amount: Number(e.target.value),
                  currency: prev.budget?.currency || {
                    currency_label: "CHF",
                  }, // Ensure currency is included
                },
              }))
            }
            error={errors.amount}
          />
          <Dropdown
            label="Currency"
            value={formData.budget?.currency.currency_label || "CHF"}
            options={["CHF", "EUR"]}
            onChange={(currency: string) =>
              setFormData(prev => ({
                ...prev,
                budget: {
                  approval_date: prev.budget?.approval_date || null,
                  amount: prev.budget?.amount || 0,
                  currency: {
                    currency_label: currency,
                  },
                },
              }))
            }
          />
          <FileUploader
            accept={ACCEPTED_TYPES}
            multiple={false}
            onFileChange={(file: File | null) => {
              setInvestFile(file)
            }}
            error={errors.files}
          />
          <div className="modal-actions">
            <Button label="Add Project" type="submit" />
            <Button label="Cancel" type="button" onClick={handleClose} />
          </div>
        </form>
      </div>
    </div>
  )
}
