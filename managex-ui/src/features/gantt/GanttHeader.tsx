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
// ...existing code...
export const GanttHeader: React.FC<GanttHeaderProps> = ({ dateArray }) => {
  const yearGroups = getYearGroups(dateArray)
  const cellWidth = 40 // px, must match min-w-[40px] below
  const minWidth = dateArray.length * cellWidth

  return (
    <div
      className="flex flex-col overflow-x-auto border-gray-800 rounded-t-lg shadow-lg"
      style={{ minWidth: `${minWidth}px` }}
    >
      {/* Year row */}
      <div className="flex flex-row rounded-lg border-lg border-b">
        {yearGroups.map(group => (
          <div
            key={group.year}
            style={{
              flex: `${group.count} 0 0`, // Flex-grow, flex-shrink, flex-basis
              minWidth: `${group.count * cellWidth}px`,
            }}
            className=" bg-gray-300 p-2 text-lg text-center text-gray-500 font-bold border-l"
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
            style={{ minWidth: `${cellWidth}px` }}
            className="flex-1 bg-gray-300 p-2 text-xs text-center border-l"
          >
            <span className="text-gray-500 whitespace-nowrap">
              {date.slice(5)} {/* MM-DD */}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
// ...existing code...
