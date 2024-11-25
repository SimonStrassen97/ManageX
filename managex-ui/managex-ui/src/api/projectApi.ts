import axios from "axios"

export const fetchProjectOverviewData = async (
  filters: { [key: string]: string } = {},
) => {
  const params = new URLSearchParams(filters).toString() //  filters object to URL string
  const response = await axios.get(`/projects/?${params}`) // Use backticks here
  return response.data
}

export const fetchGanttData = async (
  filters: { [key: string]: string } = {},
) => {
  const params = new URLSearchParams(filters).toString() //  filters object to URL string
  const response = await axios.get(`/gantt/?${params}`) // Use backticks here
  return response.data
}
