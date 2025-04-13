import React from "react"
import { FilterWindow } from "../../features/filter/FilterWindow"

export const Sidebar: React.FC = () => {
  return (
    <div className="p-4 border-r border-gray-300">
      <FilterWindow />
    </div>
  )
}
