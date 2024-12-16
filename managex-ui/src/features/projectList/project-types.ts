// export interface ProjectState {
//   project_name: string
//   project_number: string
//   project_lead: string
//   project_status: string
//   confirmed_project_status: string

//   amount?: null | number
//   currency_label?: null | string
//   exchange_rate?: null | number

//   start_date: Date
//   order_date: null | Date
//   acceptance_date: null | Date
//   delivery_date: null | Date
//   finish_date: Date
// }

// // Define the state shape for the slice
// export interface Projects {
//   projects: ProjectState[] // An array to hold multiple projects
// }

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
}
