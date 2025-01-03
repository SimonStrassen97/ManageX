import { Project } from "./project-types"
import { stringToDate } from "../../utils/transforms"

export const validateProject = (project: Project): Record<string, string> => {
  const newErrors: Record<string, string> = {}

  if (!project.project_number.trim()) {
    newErrors.project_number = "Project number is required"
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
  if (project.budget?.amount === undefined || project.budget?.amount < 0) {
    newErrors.amount = "Invalid budget amount"
  }

  return newErrors
}

export const validateProjects = (
  projects: Project[],
): Record<string, Record<string, string>> => {
  const allErrors: Record<string, Record<string, string>> = {}

  projects.forEach((project, index) => {
    const projectErrors = validateProject(project)
    if (Object.keys(projectErrors).length > 0) {
      allErrors[`project_${index}`] = projectErrors
    }
  })

  return allErrors
}
