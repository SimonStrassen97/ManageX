interface SerializedBudget {
  amount: number
  currency: SerializedCurrency
}

interface SerializedCurrency {
  currency_label: string
  exchange_rate: number
}

interface SerializedTimeline {
  // date string from DRF: YYYY-MM-DD
  start_date: string
  order_date: string | null
  acceptance_date: string | null
  delivery_date: string | null
  finish_date: string
}

export interface SerializedProject {
  project_name: string
  project_number: string
  project_lead: string
  project_status: string
  confirmed_project_status: string
  budget?: SerializedBudget | null
  timeline: SerializedTimeline
}

export interface SerializedUser {
  id: number
  username: string
  first_name: string
  last_name: string
}

export interface SerializedUserList {
  users: SerializedUser[]
}

export interface SerializedUserDetailed extends SerializedUser {
  email: string
}

export interface SerializedToken {
  access: string
  refresh: string
}

export interface SerializedProjectFile {
  project_number: string
  file: string
  original_filename: string
}
