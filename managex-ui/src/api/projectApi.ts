import axiosInstance from "./axiosConfig"
import {
  SerializedProjects,
  SerializedProjectState,
} from "./server-response-types"
import {
  ProjectState,
  Projects,
  ProjectInfo,
  Budget,
  Timeline,
} from "../features/projects/project-types"

class ResponseHandler {
  static parseDateString = (dateString: string | null): Date | null => {
    if (!dateString) return null
    const date = new Date(dateString)
    date.setHours(0, 0, 0, 0)
    return date
  }

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
          start_date: this.parseDateString(
            serializedProject.timeline.start_date,
          ) as Date,
          order_date: this.parseDateString(
            serializedProject.timeline.order_date,
          ),
          acceptance_date: this.parseDateString(
            serializedProject.timeline.acceptance_date,
          ),
          delivery_date: this.parseDateString(
            serializedProject.timeline.delivery_date,
          ),
          finish_date: this.parseDateString(
            serializedProject.timeline.finish_date,
          ) as Date,
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

    return {
      projects,
      loading: false,
      error: null,
    }
  }
}

export const fetchProjects = async (
  filters: { [key: string]: string } = {},
): Promise<Projects> => {
  const params = new URLSearchParams(filters).toString()
  const response = await axiosInstance.get<SerializedProjectState[]>(
    `api/projects/?${params}`,
  )
  const serializedProjects: SerializedProjects = { projects: response.data }
  return ResponseHandler.convert(serializedProjects)
}

export const addProject = async (): Promise<ProjectState> => {
  const response =
    await axiosInstance.post<SerializedProjectState>(`api/projects/`)
  const serializedProject: SerializedProjectState = response.data
  return ResponseHandler.convert({ projects: [serializedProject] }).projects[0]
}
