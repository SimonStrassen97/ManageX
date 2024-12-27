import {
  SerializedProjects,
  SerializedProjectState,
} from "../api/server-response-types"
import {
  ProjectState,
  Projects,
  ProjectInfo,
  Budget,
  Timeline,
} from "../features/projects/project-types"

export function stringToDate(dateString: string | null): Date | null {
  if (!dateString) return null
  const date = new Date(dateString)
  date.setHours(0, 0, 0, 0)
  return date
}

export function dateToString(date: Date | null): string | null {
  return date ? date.toISOString().split("T")[0] : null
}

export class ProjectTransformer {
  static serializeProject(project: ProjectState): SerializedProjectState {
    return {
      project_number: project.project_number,
      project_name: project.project_info.project_name,
      project_lead: project.project_info.project_lead,
      project_status: project.project_info.project_status,
      confirmed_project_status: project.project_info.confirmed_project_status,
      budget: project.budget
        ? {
            amount: project.budget.amount,
            currency: {
              currency_label: project.budget.currency.currency_label,
              exchange_rate: project.budget.currency.exchange_rate,
            },
          }
        : null,
      timeline: {
        start_date: project.timeline.start_date,
        order_date: project.timeline.order_date,
        acceptance_date: project.timeline.acceptance_date,
        delivery_date: project.timeline.delivery_date,
        finish_date: project.timeline.finish_date,
      },
    }
  }

  static serializeProjects(projects: Projects): SerializedProjects {
    const serializedProjects: SerializedProjectState[] = projects.projects.map(
      project => this.serializeProject(project),
    )
    return { projects: serializedProjects }
  }

  static deserializeProject(
    serializedProject: SerializedProjectState,
  ): ProjectState {
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
            currency_label: serializedProject.budget.currency.currency_label,
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

    return {
      project_number: serializedProject.project_number,
      project_info: projectInfo,
      budget: budget,
      timeline: timeline,
    }
  }

  static deserializeProjects(serializedProjects: SerializedProjects): Projects {
    const projects: ProjectState[] = serializedProjects.projects.map(
      serializedProject => this.deserializeProject(serializedProject),
    )

    return {
      projects,
      loading: false,
      error: null,
    }
  }

  static createProjectsFromProject(project: ProjectState): Projects {
    return {
      projects: [project],
      loading: false,
      error: null,
    }
  }
}
