import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { Project } from "../../types/project-types"

interface GanttRowProps {
  project: Project
}

export const GanttRow: React.FC<GanttRowProps> = ({ project }) => {
  return (
    <div className="">
      <h1 className="text-lg font-bold text-white">
        {project.project_info.project_name}
      </h1>
    </div>
  )
}
