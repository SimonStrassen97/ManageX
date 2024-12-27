import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProjects, addProject } from "../../api/projectApi"
import { ProjectState } from "./project-types"

export const fetchProjectsThunk = createAsyncThunk(
  "projects/fetchFilteredProjects",
  async (filters: { [key: string]: string } = {}) => {
    return await fetchProjects(filters)
  },
)

export const addProjectThunk = createAsyncThunk(
  "projects/addProject",
  async (project: ProjectState) => {
    return await addProject(project)
  },
)
