export interface SerializedProject {
  project_name: string
  project_number: string
  project_lead: string
  project_status: string
  confirmed_project_status: string
  budget: Number
  timeline: {
    start_date: Date
    order_date: Date
    acceptance_date: Date
    delivery_date: Date
    finish_date: Date
  }
}
