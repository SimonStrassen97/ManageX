import React from "react"

interface ListCellProps {
  children: React.ReactNode
  className?: string
  as?: "td" | "th"
}

export const ListCell: React.FC<ListCellProps> = ({
  children,
  className = "",
  as = "td",
}) => {
  const Tag = as
  return (
    <Tag className={["px-4 py-2 border text-sm", className].join(" ")}>
      {children}
    </Tag>
  )
}
