import React from "react"

interface GanttCellProps {
  min_width: number
  children?: React.ReactNode
  isFirstRow?: boolean
  isFirstCol?: boolean
  flex_grow_coefficient?: number
  className?: string
}

export const GanttCell: React.FC<GanttCellProps> = ({
  min_width,
  children,
  isFirstCol = false,
  isFirstRow = false,
  flex_grow_coefficient = 1,
  className = "",
}) => {
  return (
    <div
      style={{
        minWidth: `${min_width}px`,
        flex: `${flex_grow_coefficient} 0 0`,
      }}
      className={[
        "py-2 flex items-center justify-center",
        isFirstRow ? "" : "border-t",
        isFirstCol ? "" : "border-l",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
