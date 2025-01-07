import { AppError } from "../../utils/error-handling"

// Domain Types
export interface Budget {
  amount: number
  currency: Currency
}

export interface Currency {
  currency_label: string
  exchange_rate: number
}

export interface Timeline {
  start_date: string
  order_date: string | null
  acceptance_date: string | null
  delivery_date: string | null
  finish_date: string
}

export interface ProjectInfo {
  project_name: string
  project_lead: string
  project_status: string
  confirmed_project_status: string
}

export interface Project {
  project_number: string
  project_info: ProjectInfo
  budget?: Budget | null
  timeline: Timeline
}

// State Management Types
export interface ProjectsState {
  projects: Project[]
  loading: boolean
  error: AppError | null
}
