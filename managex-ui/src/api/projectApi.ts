import axiosInstance from "./axiosConfig"
import { SerializedProject } from "./server-response-types"

const transformResponse = (input: SerializedProject): any => {
  return {}
}

export const fetchProjectOverviewData = async (
  filters: { [key: string]: string } = {},
) => {
  const params = new URLSearchParams(filters).toString() //  filters object to URL string
  const response = await axiosInstance.get(`api/projects/?${params}`) // Use backticks here
  return response.data
}

export const fetchGanttData = async (
  filters: { [key: string]: string } = {},
) => {
  const params = new URLSearchParams(filters).toString() //  filters object to URL string
  const response = await axiosInstance.get(`api/gantt/?${params}`) // Use backticks here
  return response.data
}
