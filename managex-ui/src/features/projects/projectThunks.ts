import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects, addProject } from "../../api/projectApi"

export const fetchProjectsThunk = createAsyncThunk(
  "projects/fetchFilteredProjects",
  async (filters: { [key: string]: string } = {}) => {
    return await fetchProjects(filters)
  },
)

export const addProjectThunk = createAsyncThunk(
  "projects/addProject",
  async () => {
    return await addProject()
  },
)
