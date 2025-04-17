import React from "react"
import { CircleUserRound } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { Card } from "../../types/kanban-types"

interface KanbanCardProps {
  card: Card
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.card_id,
    data: {
      type: "Card",
      card,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-md p-2 ${
        isDragging ? "border-2 border-blue-500 opacity-50" : ""
      }`}
    >
      {/* Project Number on Top Right */}
      <div className="flex justify-end">
        <div className="bg-blue-200 text-blue-800 font-bold text-xs rounded-full py-1 px-3">
          {card.task_number}
        </div>
      </div>
      {/* Project Name */}
      <div className="text-md font-semibold text-gray-800 break-words max-w-70%">
        {card.task_name}
      </div>
      {/* Project Leader */}
      <div className="flex text-xs text-gray-800 mt-2">
        <CircleUserRound className="h-4" /> {card.task_leader}
      </div>
    </div>
  )
}
