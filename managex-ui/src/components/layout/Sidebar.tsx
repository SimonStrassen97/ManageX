import React from "react"
import { FilterWindow } from "../../features/filter/FilterWindow"

export const Sidebar: React.FC = () => {
  return (
    <div style={{ width: "250px", border: "1px solid #ccc", padding: "10px" }}>
      <h2>Sidebar</h2>
      <FilterWindow />
      {/* Future sections can be added here */}
    </div>
  )
}
