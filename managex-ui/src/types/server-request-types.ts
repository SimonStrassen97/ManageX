export interface AddProjectRequest {
  project_name: string
  project_number: string
  project_lead_id: number
  project_status_id: number
  confirmed_project_status_id: number | null
  budget: {
    amount: number
    currency_id: number
    approval_date: string | null
  }
  timeline: {
    start_date: string
    order_date: string | null
    acceptance_date: string | null
    delivery_date: string | null
    finish_date: string
  }
}

export interface UpdateProjectRequest {
  project_id: number
  project_name: string
  project_number: string
  project_lead_id: number
  project_status_id: number
  confirmed_project_status_id: number
  budget: {
    amount: number
    currency_id: number
    approval_date: string | null
  }
  timeline: {
    start_date: string
    order_date: string | null
    acceptance_date: string | null
    delivery_date: string | null
    finish_date: string
  }
}

export type PartialProjectUpdate = Partial<UpdateProjectRequest>

export interface UploadFileRequest {
  project_number: string
  file: File | null
}
