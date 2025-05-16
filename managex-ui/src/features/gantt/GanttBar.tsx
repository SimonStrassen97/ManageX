import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { Project } from "../../types/project-types"

interface GanttBarProps {}

export const GanttBar = () => {
  return (
    <div className="flex-1 flex items-center">
      <div className="h-4 w-full bg-purple-600"></div>
    </div>
  )
}
export const GanttBarStart = () => {
  return (
    <div className="flex-1 flex items-center justify-end">
      <div className="h-4 min-w-[25px] bg-red-600 rounded-l-lg"></div>
    </div>
  )
}

export const GanttBarEnd = () => {
  return (
    <div className="flex-1 flex items-center">
      <div className="h-4 min-w-[25px] bg-blue-600 rounded-r-lg"></div>
    </div>
  )
}

export const GanttBarStartEnd = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="h-4 min-w-[25px] bg-purple-600 rounded-lg"></div>
    </div>
  )
}
