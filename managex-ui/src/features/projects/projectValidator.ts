import { Project } from "./project-types"
import { stringToDate } from "../../utils/transforms"
import { checkProjectNumberAvailability } from "../../api/projectApi"

const projectNumberRegex = /^B\d{2}-\d{2}$/

export const validateProject = async (
  project: Project,
): Promise<Record<string, string>> => {
  const newErrors: Record<string, string> = {}

  if (!project.project_number.trim()) {
    newErrors.project_number = "Project number is required"
  } else if (!projectNumberRegex.test(project.project_number)) {
    newErrors.project_number = "Project number must be in the format Byy-xx"
  } else {
    const isAvailable = await checkProjectNumberAvailability(
      project.project_number,
    )
    if (!isAvailable) {
      newErrors.project_number = "Project number is already taken"
    }
  }

  if (!project.project_info?.project_name?.trim()) {
    newErrors.project_name = "Project name is required"
  }
  if (!project.project_info?.project_lead?.trim()) {
    newErrors.project_lead = "Project lead is required"
  }
  if (!project.timeline.start_date) {
    newErrors.start_date = "Start date is required"
  }
  if (!project.timeline.finish_date) {
    newErrors.finish_date = "Finish date is required"
  } else if (
    stringToDate(project.timeline.start_date)! >
    stringToDate(project.timeline.finish_date)!
  ) {
    newErrors.finish_date = "Finish date must be after start date"
  }

  // Ensure empty date fields are set to null
  project.timeline.order_date = project.timeline.order_date || null
  project.timeline.acceptance_date = project.timeline.acceptance_date || null
  project.timeline.delivery_date = project.timeline.delivery_date || null

  if (project.budget?.amount === undefined || project.budget?.amount < 0) {
    newErrors.amount = "Invalid budget amount"
  }

  return newErrors
}

export const validateProjects = async (
  projects: Project[],
): Promise<Record<string, Record<string, string>>> => {
  const allErrors: Record<string, Record<string, string>> = {}

  for (const [index, project] of projects.entries()) {
    const projectErrors = await validateProject(project)
    if (Object.keys(projectErrors).length > 0) {
      allErrors[`project_${index}`] = projectErrors
    }
  }

  return allErrors
}
