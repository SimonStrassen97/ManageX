interface SerializedBudget {
  amount: number
  currency: SerializedCurrency
}

interface SerializedCurrency {
  currency_label: string
  exchange_rate: number
}

interface SerializedTimeline {
  start_date: Date
  order_date: Date | null
  acceptance_date: Date | null
  delivery_date: Date | null
  finish_date: Date
}

export interface SerializedProjectState {
  project_name: string
  project_number: string
  project_lead: string
  project_status: string
  confirmed_project_status: string
  budget?: SerializedBudget | null
  timeline: SerializedTimeline
}

export interface SerializedProjects {
  projects: SerializedProjectState[]
}
