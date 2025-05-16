export interface StatusResponse {
  status_id: number
  status_label: string
}

interface BudgetResponse {
  budget_id: number
  amount: number
  currency: CurrencyResponse
  approval_date: string | null
}

interface CurrencyResponse {
  currency_id: number
  currency_label: string
  exchange_rate: number
}

interface TimelineResponse {
  // date string from DRF: YYYY-MM-DD
  start_date: string
  order_date: string | null
  acceptance_date: string | null
  delivery_date: string | null
  finish_date: string
}

export interface UserResponse {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
}

export interface ProjectResponse {
  project_id: number
  project_name: string
  project_number: string
  project_lead: UserResponse
  project_status: StatusResponse
  confirmed_project_status: StatusResponse
  budget?: BudgetResponse | null
  timeline: TimelineResponse
}

export interface TokenResponse {
  access: string
  refresh: string
}

export interface ProjectFileResponse {
  file_id: number
  project_number: string
  file: string // URL or path to the file
  filename: string
  DATECREATE: string // Date string
}
