import { ProjectResponse } from "../types/server-response-types"
import { Project, ProjectInfo, Budget, Timeline } from "../types/project-types"

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
  static fromServer(
    projectResponse: ProjectResponse | ProjectResponse[],
  ): Project | Project[] {
    if (Array.isArray(projectResponse)) {
      return projectResponse.map(pr => this.fromServerSingle(pr))
    } else {
      return this.fromServerSingle(projectResponse)
    }
  }

  private static fromServerSingle(projectResponse: ProjectResponse): Project {
    const projectInfo: ProjectInfo = {
      project_number: projectResponse.project_number,
      project_name: projectResponse.project_name,
      project_lead: projectResponse.project_lead.username,
      project_status: projectResponse.project_status.status_label,
      confirmed_project_status:
        projectResponse.confirmed_project_status?.status_label ?? null,
    }

    const budget: Budget | null = projectResponse.budget
      ? {
          amount: projectResponse.budget.amount,
          approval_date: projectResponse.budget.approval_date,
          currency_label: projectResponse.budget.currency.currency_label,
          exchange_rate: projectResponse.budget.currency.exchange_rate,
        }
      : null

    const timeline: Timeline = {
      start_date: projectResponse.timeline.start_date,
      order_date: projectResponse.timeline.order_date,
      acceptance_date: projectResponse.timeline.acceptance_date,
      delivery_date: projectResponse.timeline.delivery_date,
      finish_date: projectResponse.timeline.finish_date,
    }

    return {
      project_id: projectResponse.project_id,
      project_info: projectInfo,
      budget: budget,
      timeline: timeline,
    }
  }
}

import { StatusResponse } from "../types/server-response-types"
import { Status } from "../types/project-types"

export class StatusTransformer {
  static fromServer(
    statusResponse: StatusResponse | StatusResponse[],
  ): Status | Status[] {
    if (Array.isArray(statusResponse)) {
      return statusResponse.map(sr => this.fromServerSingle(sr))
    } else {
      return this.fromServerSingle(statusResponse)
    }
  }

  private static fromServerSingle(statusResponse: StatusResponse): Status {
    return {
      status_id: statusResponse.status_id,
      status_label: statusResponse.status_label,
    }
  }
}

import { UserResponse } from "../types/server-response-types"
import { User } from "../types/user-types"

export class UserTransformer {
  static fromServer(
    userResponse: UserResponse | UserResponse[],
  ): User | User[] {
    if (Array.isArray(userResponse)) {
      return userResponse.map(ur => this.fromServerSingle(ur))
    } else {
      return this.fromServerSingle(userResponse)
    }
  }
  private static fromServerSingle(userResponse: UserResponse): User {
    return {
      id: userResponse.id,
      username: userResponse.username,
      first_name: userResponse.first_name,
      last_name: userResponse.last_name,
      email: userResponse.email,
    }
  }
}

import { TokenResponse } from "../types/server-response-types"
import { AuthToken } from "../types/auth-types"

export class TokenTransformer {
  static fromServer(tokenResponse: TokenResponse): AuthToken {
    return {
      access: tokenResponse.access,
      refresh: tokenResponse.refresh,
    }
  }
}

import { ProjectFileResponse } from "../types/server-response-types"
import { ProjectFile } from "../types/file-types"
import { UploadFileRequest } from "../types/server-request-types"

export class FileTransformer {
  static fromServer(
    projectFileResponse: ProjectFileResponse | ProjectFileResponse[],
  ): ProjectFile | ProjectFile[] {
    if (Array.isArray(projectFileResponse)) {
      return projectFileResponse.map(pfr => this.fromServerSingle(pfr))
    } else {
      return this.fromServerSingle(projectFileResponse)
    }
  }

  private static fromServerSingle(
    projectFileResponse: ProjectFileResponse,
  ): ProjectFile {
    return {
      file_id: projectFileResponse.file_id,
      project_number: projectFileResponse.project_number,
      file: projectFileResponse.file,
      filename: projectFileResponse.filename,
      date_created: projectFileResponse.DATECREATE,
    }
  }
}
