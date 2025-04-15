import React from "react"

interface KanbanCardProps {
  card: {
    id: string
    title: string
    description?: string
  }
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-md font-bold text-gray-800">{card.title}</h3>
      {card.description && (
        <p className="text-sm text-gray-600 mt-2">{card.description}</p>
      )}
    </div>
  )
}
