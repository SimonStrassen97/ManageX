import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { GanttHeader } from "./GanttHeader"
import { GanttRow } from "./GanttRow"

function getMinMaxDate(
  projects: { timeline: { start_date: string; finish_date: string } }[],
) {
  if (!projects.length) return [null, null]

  const startDates = projects.map(p => new Date(p.timeline.start_date))
  const endDates = projects.map(p => new Date(p.timeline.finish_date))

  const minDate = new Date(Math.min(...startDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...endDates.map(d => d.getTime())))

  return [minDate, maxDate]
}

function getMonthRange(minDate: Date, maxDate: Date): string[] {
  const monthArray: string[] = []
  let current = new Date(minDate.getFullYear(), minDate.getMonth(), 1)

  while (current <= maxDate) {
    const year = current.getFullYear()
    const month = (current.getMonth() + 1).toString().padStart(2, "0")
    monthArray.push(`${year}-${month}`)
    // Move to the first day of the next month
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1)
  }

  return monthArray
}

export const GanttChart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const projects = useSelector((state: RootState) => state.projects.projects)
  const [dateArray, setDateArray] = useState<string[]>([])

  useEffect(() => {
    const [minDate, maxDate] = getMinMaxDate(projects)
    if (!minDate || !maxDate) return
    setDateArray(getMonthRange(minDate, maxDate))
  }, [projects])

  return (
    <div className="flex flex-1 w-full p-4">
      <div className="flex flex-col w-full shadow-lg overflow-auto border-2 border-gray-300 rounded-md">
        <GanttHeader dateArray={dateArray} />
        {projects.map((project, idx) => (
          <GanttRow
            key={project.project_id}
            row_idx={idx}
            project={{ ...project }}
            dateArray={dateArray}
          />
        ))}
      </div>
    </div>
  )
}
