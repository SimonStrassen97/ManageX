import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { Project } from "../../types/project-types"

import {
  GanttBar,
  GanttBarStart,
  GanttBarEnd,
  GanttBarStartEnd,
} from "./GanttAttributes"

interface GanttRowProps {
  project: Project
  dateArray: string[]
}

export const GanttRow: React.FC<GanttRowProps> = ({ project, dateArray }) => {
  const startDate = new Date(project.timeline.start_date)
  const endDate = new Date(project.timeline.finish_date)

  // Helper to get YYYY-MM string from a Date
  const getYearMonth = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

  const startYM = getYearMonth(startDate)
  const endYM = getYearMonth(endDate)

  let withinBar = false

  return (
    <div className="flex flex-row">
      {dateArray.map(dateYM => {
        // Only render bars for months between start and end (inclusive)
        if (dateYM < startYM || dateYM > endYM) {
          return (
            <div
              key={dateYM}
              style={{ minWidth: `40px` }}
              className="py-2 border-l border-b border-gray-300"
            />
          )
        }

        // If start and end are the same month
        if (startYM === endYM && dateYM === startYM) {
          return (
            <div
              key={dateYM + "-startend"}
              style={{ minWidth: `40px` }}
              className="py-2 border-l border-b border-gray-300"
            >
              <GanttBarStartEnd />
            </div>
          )
        }

        // Start month
        if (dateYM === startYM) {
          return (
            <div
              key={dateYM + "-start"}
              style={{ minWidth: `40px` }}
              className="py-2 border-l border-b border-gray-300"
            >
              <GanttBarStart />
            </div>
          )
        }

        // End month
        if (dateYM === endYM) {
          return (
            <div
              key={dateYM + "-end"}
              style={{ minWidth: `40px` }}
              className="py-2 border-l border-b border-gray-300"
            >
              <GanttBarEnd />
            </div>
          )
        }

        // In between
        return (
          <div
            key={dateYM}
            style={{ minWidth: `40px` }}
            className="py-2 border-l border-b border-gray-300"
          >
            <GanttBar />
          </div>
        )
      })}
    </div>
  )
}
