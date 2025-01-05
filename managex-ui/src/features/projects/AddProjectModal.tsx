import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"
import { Project } from "./project-types"
import { addProjectThunk } from "./projectThunks"
import { DatePicker, Button, Dropdown, Input } from "../../components"
import { dateToString, stringToDate } from "../../utils/transforms"
import { validateProject } from "./projectValidator"
import { FileUploader } from "../../components/FileUploader"
import { ProjectFile } from "../files/file-types"
import { uploadFileThunk } from "../files/fileThunks"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialFormData: Project = {
  project_number: "",
  project_info: {
    project_name: "",
    project_lead: "",
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
    currency: {
      currency_label: "CHF",
      exchange_rate: 1.0,
    },
  },
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch
  const [formData, setFormData] = useState<Project>(initialFormData)
  const [investFile, setInvestFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const ACCEPTED_TYPES =
    ".pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateProject(formData)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      dispatch(addProjectThunk(formData))
      const uploadFile: ProjectFile = {
        file: investFile || null,
        project_number: formData.project_number,
        filename: investFile?.name || "",
      }
      dispatch(uploadFileThunk(uploadFile))
      setFormData(initialFormData)
      onClose()
    } catch (error) {
      console.error("Error adding project:", error)
    }
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
            required
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
            required
            error={errors.project_name}
          />

          <Input
            label="Project Lead"
            type="text"
            value={formData.project_info?.project_lead || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData(prev => ({
                ...prev,
                project_info: {
                  ...prev.project_info,
                  project_lead: e.target.value,
                },
              }))
            }
            required
            error={errors.project_lead}
          />

          <DatePicker
            label="Start Date"
            value={
              formData.timeline.start_date // Non-null assertion
            }
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
            required
            error={errors.delivery_date}
          />
          <DatePicker
            label="Finish Date"
            value={
              formData.timeline.finish_date // Non-null assertion
            }
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

          <Input
            label="Budget Amount"
            type="number"
            value={formData.budget?.amount || 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData(prev => ({
                ...prev,
                budget: {
                  ...prev.budget,
                  amount: Number(e.target.value),
                  currency: prev.budget?.currency || {
                    currency_label: "CHF",
                    exchange_rate: 1.0,
                  }, // Ensure currency is included
                },
              }))
            }
            required
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
                  amount: prev.budget?.amount || 0,
                  currency: {
                    currency_label: currency,
                    exchange_rate: prev.budget?.currency.exchange_rate || 1.0,
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
            <Button label="Cancel" type="button" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  )
}
