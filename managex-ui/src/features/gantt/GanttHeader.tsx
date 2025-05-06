import React from "react"

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

export const GanttHeader: React.FC<GanttHeaderProps> = ({ dateArray }) => {
  const yearGroups = getYearGroups(dateArray)
  return (
    <div className="flex flex-col">
      {/* Year row */}
      <div className="flex flex-row">
        {yearGroups.map(group => (
          <div
            key={group.year}
            className="bg-gray-800 p-2 text-white text-xs text-center border-l border-gray-600"
            style={{ minWidth: `${group.count * 80}px` }}
          >
            <span className="whitespace-nowrap">{group.year}</span>
          </div>
        ))}
      </div>
      {/* Day/Month row */}
      <div className="flex flex-row">
        {dateArray.map(date => (
          <div
            key={date}
            className=" bg-gray-700 p-2 text-xs text-center border-l border-gray-600"
          >
            <span className="text-white whitespace-nowrap">
              {date.slice(5)} {/* MM-DD */}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
