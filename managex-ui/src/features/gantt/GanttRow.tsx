import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { Project } from "../../types/project-types"

import { GanttBar, GanttBarStart, GanttBarEnd } from "./GanttAttributes"

interface GanttRowProps {
  project: Project
  dateArray: string[]
}

export const GanttRow: React.FC<GanttRowProps> = ({ project, dateArray }) => {
  return (
    <div className="flex flex-row">
      {dateArray.map(date => (
        <div
          key={date}
          style={{ minWidth: `40px` }}
          className="py-2 border-l border-b border-gray-300"
        >
          <GanttBar />
        </div>
      ))}
    </div>
  )
}
