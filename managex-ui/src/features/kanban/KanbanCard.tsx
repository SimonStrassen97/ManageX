import React from "react"
import { CircleUserRound } from "lucide-react"

interface KanbanCardProps {
  card: {
    card_name: string
    card_number: string
    card_leader: string
  }
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2">
      {/* Project Number on Top Right */}
      <div className="flex justify-end">
        <div className="bg-blue-200 text-blue-800 font-bold text-xs rounded-full py-1 px-3">
          {card.card_number}
        </div>
      </div>
      {/* Project Name */}
      <div className="text-md font-semibold text-gray-800 break-words max-w-70%">
        {card.card_name}
      </div>
      {/* Project Leader */}
      <div className="flex text-xs text-gray-800 mt-2">
        <CircleUserRound className="h-4" /> {card.card_leader}
      </div>
    </div>
  )
}
