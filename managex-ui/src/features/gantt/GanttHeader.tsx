import React from "react"
import { GanttCell } from "./GanttCell"
import { GANTT_CELL_WIDTH, GANTT_INFO_CELL_WIDTH } from "./GanttConstant"

interface GanttHeaderProps {
  dateArray: string[]
}

function getYearGroups(dateArray: string[]) {
  // Returns [{ year: "2024", count: 5 }, ...]
  const groups: { year: string; count: number }[] = []
  let currentYear = ""
  let count = 0
  dateArray.forEach(date => {
    const year = date.slice(0, 4)
    if (year !== currentYear) {
      if (count > 0) groups.push({ year: currentYear, count })
      currentYear = year
      count = 1
    } else {
      count++
    }
  })
  if (count > 0) groups.push({ year: currentYear, count })
  return groups
}
// ...existing code...
export const GanttHeader: React.FC<GanttHeaderProps> = ({ dateArray }) => {
  const yearGroups = getYearGroups(dateArray)
  const minWidth = dateArray.length * GANTT_CELL_WIDTH

  return (
    <div className="flex flex-row bg-gray-300 border-b">
      <GanttCell
        min_width={GANTT_INFO_CELL_WIDTH}
        isFirstCol={true}
        isFirstRow={true}
        flex_grow_coefficient={0}
        className="bg-gray-300"
      >
        <span className="text-gray-500 font-bold whitespace-nowrap">Task</span>
      </GanttCell>
      <div
        className="flex flex-col w-full bg-gray-300"
        style={{ minWidth: `${minWidth}px` }}
      >
        {/* Year row */}
        <div className="flex flex-row">
          {yearGroups.map((group, idx) => (
            <GanttCell
              key={group.year}
              min_width={group.count * GANTT_CELL_WIDTH}
              flex_grow_coefficient={group.count}
              isFirstRow={true}
            >
              <span className="text-gray-500 font-bold whitespace-nowrap">
                {group.year}
              </span>
            </GanttCell>
          ))}
        </div>
        {/* Day/Month row */}
        <div className="flex flex-row">
          {dateArray.map((date, idx) => (
            <GanttCell key={date} min_width={GANTT_CELL_WIDTH}>
              <span className="text-gray-500 whitespace-nowrap">
                {date.slice(5)}
              </span>
            </GanttCell>
          ))}
        </div>
      </div>
    </div>
  )
}
