import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { GanttHeader } from "./GanttHeader"
import { GanttRow } from "./GanttRow"

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
    setDateArray(prev => {
      const newDates = getMonthRange(
        new Date("2022-01-01"),
        new Date("2025-11-05"),
      )
      return newDates
    })
  }, [])

  return (
    <div className="flex flex-1 w-full h-full p-4">
      <div className="flex flex-col w-full shadow-lg overflow-auto">
        <GanttHeader dateArray={dateArray} />
        {projects.map(project => (
          <GanttRow key={project.project_id} project={{ ...project }} />
        ))}
      </div>
    </div>
  )
}
