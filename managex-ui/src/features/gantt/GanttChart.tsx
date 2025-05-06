import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { GanttHeader } from "./GanttHeader"
import { GanttRow } from "./GanttRow"

function getDateRange(minDate: Date, maxDate: Date): string[] {
  const dateArray: string[] = []
  const current = new Date(minDate)

  while (current <= maxDate) {
    const year = current.getFullYear()
    const month = (current.getMonth() + 1).toString().padStart(2, "0")
    const day = current.getDate().toString().padStart(2, "0")
    dateArray.push(`${year}-${month}-${day}`)
    current.setDate(current.getDate() + 1)
  }

  return dateArray
}

export const GanttChart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const projects = useSelector((state: RootState) => state.projects.projects)
  const [dateArray, setDateArray] = useState<string[]>([])

  useEffect(() => {
    setDateArray(prev => {
      const newDates = getDateRange(
        new Date("2024-01-01"),
        new Date("2025-12-31"),
      )
      return newDates
    })
  }, [])

  return (
    <div className="flex flex-1 w-full h-full p-4 bg-gray-900">
      <div className="flex flex-col w-full h-full bg-gray-800 rounded-lg shadow-lg overflow-auto">
        <GanttHeader dateArray={dateArray} />
        {projects.map(project => (
          <GanttRow key={project.project_id} project={{ ...project }} />
        ))}
      </div>
    </div>
  )
}
