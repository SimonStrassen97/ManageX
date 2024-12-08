// Define the structure for a single project
export interface Timeline {
  start_date: Date
  order_date: Date
  acceptance_date: Date
  delivery_date: Date
  finish_date: Date
}

export interface Project {
  project_number: number
  project_name: string
  project_lead: string
  project_status: string
  confirmed_project_status: string
  project_timeline: Timeline
}

// Define the state shape for the slice
export interface ProjectState {
  projects: Project[] // An array to hold multiple projects
}
