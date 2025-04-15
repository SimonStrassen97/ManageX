import React from "react"
import { KanbanCard } from "./KanbanCard"

interface KanbanColumnProps {
  status: string
  cards: { id: string; title: string; description?: string }[]
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status }) => {
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()

  return (
    <div className="bg-gray-300 rounded-lg shadow-md flex flex-col h-full">
      {/* Sticky title: */}
      <div className="sticky rounded-lg top-0 bg-gray-300 z-10 p-4">
        <h2 className="text-lg font-bold text-gray-500">{formattedStatus}</h2>
      </div>
      {/* Scrollable content: */}
      <div className="flex-1 rounded-lg overflow-y-auto p-2 space-y-2">
        {/* Cards */}
      </div>
    </div>
  )
}
