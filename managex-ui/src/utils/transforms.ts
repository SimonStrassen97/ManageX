import { SerializedProject } from "../api/server-response-types"
import {
  Project,
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
  static serializeProject(project: Project): SerializedProject {
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

  static serializeProjects(projects: Project[]): SerializedProject[] {
    const serializedProjects: SerializedProject[] = projects.map(project =>
      this.serializeProject(project),
    )
    return serializedProjects
  }

  static deserializeProject(serializedProject: SerializedProject): Project {
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

  static deserializeProjects(
    serializedProjects: SerializedProject[],
  ): Project[] {
    const projects: Project[] = serializedProjects.map(serializedProject =>
      this.deserializeProject(serializedProject),
    )

    return projects
  }

  static createProjectsFromProject(project: Project): Project[] {
    return [project]
  }
}

import { SerializedUserDetailed } from "../api/server-response-types"
import { CurrentUser } from "../features/users/user-types"
import { SerializedUser } from "../api/server-response-types"
import { User } from "../features/users/user-types"


export class UserTransformer {
  static serializeUser(
    user: User | CurrentUser,
  ): SerializedUser | SerializedUserDetailed {
    const baseUser = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    }

    return {
      ...baseUser,
      email: "email" in user ? user.email : "", // Fallback for missing email
    }
  }

  static deserializeUser(
    serializedUser: SerializedUser | SerializedUserDetailed,
  ): SerializedUserDetailed {
    const baseUser = {
      id: serializedUser.id,
      username: serializedUser.username,
      first_name: serializedUser.first_name,
      last_name: serializedUser.last_name,
    }

    return {
      ...baseUser,
      email: "email" in serializedUser ? serializedUser.email : "", // Fallback for missing email
    }
  }

  static serializeUsers(users: User[]): SerializedUser[] {
    const serializedUsers: SerializedUser[] = users.map(
      user => this.serializeUser(user) as SerializedUser,
    )
    return serializedUsers 
  }

  static deserializeUsers(serializedUsers: SerializedUser[]): User[] {
    return serializedUsers.map(
      serializedUser => this.deserializeUser(serializedUser) as User,
    )
  }
}

import { SerializedToken } from "../api/server-response-types"
import { AuthToken } from "../features/auth/auth-types"

export class TokenTransformer {
  static serializeToken(token: AuthToken): SerializedToken {
    return {
      access: token.access,
      refresh: token.refresh,
    }
  }

  static deserializeToken(serializedToken: SerializedToken): AuthToken {
    return {
      access: serializedToken.access,
      refresh: serializedToken.refresh,
    }
  }
}


import { SerializedProjectFile } from "../api/server-response-types";
import { ProjectFile, ProjectFileUpload } from "../features/files/file-types";

export class FileTransformer {
  static serializeFile(projectFileUpload: ProjectFileUpload): ProjectFileUpload {
    return {
      file: projectFileUpload.file,
      project_number: projectFileUpload.project_number
    }
  }

  static deserializeFile(serializedFile: SerializedProjectFile): ProjectFile {
    return {
      id: serializedFile.id,
      project_number: serializedFile.project_number,
      file: serializedFile.file, // File content is not returned from the server
      filename: serializedFile.filename,
      DATECREATE: serializedFile.DATECREATE,
    };
  }

  static deserializeFiles(serializedFiles: SerializedProjectFile[]): ProjectFile[] {
    return serializedFiles.map(this.deserializeFile);
  }
}