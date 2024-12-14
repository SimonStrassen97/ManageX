import axiosInstance from "./axiosConfig"
import { SerializedProjects } from "./server-response-types"
import {
  ProjectState,
  Projects,
  ProjectInfo,
  Budget,
  Timeline,
} from "../features/projectList/project-types"

class ResponseHandler {
  static convert(serializedProjects: SerializedProjects): Projects {
    const projects: ProjectState[] = serializedProjects.projects.map(
      serializedProject => {
        const projectInfo: ProjectInfo = {
          project_name: serializedProject.project_name,
          project_lead: serializedProject.project_lead,
          project_status: serializedProject.project_status,
          confirmed_project_status: serializedProject.confirmed_project_status,
        }

        const budget: Budget | null = serializedProject.budget
          ? {
              amount: serializedProject.budget.amount,
              currency: {
                currency_label:
                  serializedProject.budget.currency.currency_label,
                exchange_rate: serializedProject.budget.currency.exchange_rate,
              },
            }
          : null

        const timeline: Timeline = {
          start_date: serializedProject.timeline.start_date,
          order_date: serializedProject.timeline.order_date,
          acceptance_date: serializedProject.timeline.acceptance_date,
          delivery_date: serializedProject.timeline.delivery_date,
          finish_date: serializedProject.timeline.finish_date,
        }

        const projectState: ProjectState = {
          project_number: serializedProject.project_number,
          project_info: projectInfo,
          budget: budget,
          timeline: timeline,
        }

        return projectState
      },
    )

    return { projects }
  }
}

export const fetchProjectOverviewData = async (
  filters: { [key: string]: string } = {},
): Promise<Projects> => {
  const params = new URLSearchParams(filters).toString() //  filters object to URL string
  const response = await axiosInstance.get(`api/projects/?${params}`) // Use backticks here
  const projects_data = ResponseHandler.convert(response.data)
  return projects_data
}
