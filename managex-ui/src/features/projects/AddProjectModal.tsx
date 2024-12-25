import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { ProjectState, ProjectInfo, Timeline } from "./project-types"
import { addProject } from "./projectSlice"
import { DatePicker, Button, Dropdown, Input } from "../../components"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialFormData: ProjectState = {
  project_number: "",
  project_info: {
    project_name: "",
    project_lead: "",
    project_status: "planned",
    confirmed_project_status: "",
  },
  timeline: {
    start_date: new Date(),
    order_date: null,
    acceptance_date: null,
    delivery_date: null,
    finish_date: new Date(),
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
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<ProjectState>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.project_number.trim()) {
      newErrors.project_number = "Project number is required"
    } else if (!formData.project_info?.project_name?.trim()) {
      newErrors.project_name = "Project name is required"
    } else if (!formData.project_info?.project_lead?.trim()) {
      newErrors.project_lead = "Project lead is required"
    } else if (
      formData.timeline.start_date > formData.timeline.finish_date ||
      formData.timeline.start_date < new Date()
    ) {
      newErrors.start_date = "Invalid start date"
    } else if (
      formData.budget?.amount === undefined ||
      formData.budget?.amount < 0
    ) {
      newErrors.amount = "Invalid budget amount"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      dispatch(addProject(formData))
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
              formData.timeline?.start_date?.toISOString() ||
              new Date().toISOString()
            }
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  start_date: new Date(date),
                },
              }))
            }
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
          <div className="modal-actions">
            <Button label="Add Project" type="submit" />
            <Button label="Cancel" type="button" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  )
}
