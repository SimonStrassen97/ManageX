export interface Budget {
  amount: number
  currency: Currency
}

export interface Currency {
  currency_label: string
  exchange_rate: number
}

export interface Timeline {
  start_date: Date
  order_date: Date | null
  acceptance_date: Date | null
  delivery_date: Date | null
  finish_date: Date
}

export interface ProjectInfo {
  project_name: string
  project_lead: string
  project_status: string
  confirmed_project_status: string
}
export interface ProjectState {
  project_number: string
  project_info: ProjectInfo
  budget?: Budget | null
  timeline: Timeline
}

export interface Projects {
  projects: ProjectState[]
  loading: boolean
  error: string | null
}
