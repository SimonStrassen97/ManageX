import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { Project } from "../../types/project-types"

import {
  GanttBar,
  GanttBarStart,
  GanttBarEnd,
  GanttBarStartEnd,
} from "./GanttBar"

import { GanttCell } from "./GanttCell"
import { GANTT_CELL_WIDTH, GANTT_INFO_CELL_WIDTH } from "./GanttConstant"

interface GanttRowProps {
  row_idx: number
  project: Project
  dateArray: string[]
}

export const GanttRow: React.FC<GanttRowProps> = ({
  row_idx,
  project,
  dateArray,
}) => {
  const startDate = new Date(project.timeline.start_date)
  const endDate = new Date(project.timeline.finish_date)

  // Helper to get YYYY-MM string from a Date
  const getYearMonth = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

  const startYM = getYearMonth(startDate)
  const endYM = getYearMonth(endDate)

  return (
    <div className="flex flex-row">
      <GanttCell
        min_width={GANTT_INFO_CELL_WIDTH}
        isFirstCol={true}
        isFirstRow={row_idx === 0}
        className="bg-gray-300"
        flex_grow_coefficient={0}
      >
        <span className="text-xs font-bold text-gray-500">
          {project.project_info.project_name}
        </span>
      </GanttCell>
      {dateArray.map((dateYM, idx) => {
        if (dateYM < startYM || dateYM > endYM) {
          return (
            <GanttCell
              key={dateYM}
              min_width={GANTT_CELL_WIDTH}
              isFirstCol={idx === 0}
              isFirstRow={row_idx === 0}
              className="border-gray-300"
            />
          )
        }
        if (startYM === endYM && dateYM === startYM) {
          return (
            <GanttCell
              key={dateYM + "-startend"}
              min_width={GANTT_CELL_WIDTH}
              isFirstCol={idx === 0}
              isFirstRow={row_idx === 0}
              className="border-gray-300"
            >
              <GanttBarStartEnd />
            </GanttCell>
          )
        }
        if (dateYM === startYM) {
          return (
            <GanttCell
              key={dateYM + "-start"}
              min_width={GANTT_CELL_WIDTH}
              isFirstCol={idx === 0}
              isFirstRow={row_idx === 0}
              className="border-gray-300"
            >
              <GanttBarStart />
            </GanttCell>
          )
        }
        if (dateYM === endYM) {
          return (
            <GanttCell
              key={dateYM + "-end"}
              min_width={GANTT_CELL_WIDTH}
              isFirstCol={idx === 0}
              isFirstRow={row_idx === 0}
              className="border-gray-300"
            >
              <GanttBarEnd />
            </GanttCell>
          )
        }
        // In between
        return (
          <GanttCell
            key={dateYM}
            min_width={GANTT_CELL_WIDTH}
            isFirstCol={idx === 0}
            isFirstRow={row_idx === 0}
            className="border-gray-300"
          >
            <GanttBar />
          </GanttCell>
        )
      })}
    </div>
  )
}
