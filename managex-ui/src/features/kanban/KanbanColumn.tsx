import React, { useMemo } from "react"
import { KanbanCard } from "./KanbanCard"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { Card, Column } from "../../types/kanban-types"

interface KanbanColumnProps {
  column: Column
  cards: Card[]
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  cards,
}) => {
  const formattedStatus =
    column.column_title.charAt(0).toUpperCase() +
    column.column_title.slice(1).toLowerCase()

  const { isOver, setNodeRef } = useDroppable({
    id: column.column_id,
    data: { type: "Column", column },
  })
  const style = { color: isOver ? "green" : undefined }
  const cardIDs = useMemo(() => {
    return cards.map(card => card.card_id)
  }, [cards])

  return (
    <div className="bg-gray-300 rounded-lg flex flex-col shadow-md">
      <div className="sticky rounded-t-lg bg-inherit top-0 z-10 shadow-sm p-3 overflow-hidden">
        <h2 className="text-lg font-bold text-gray-500">{formattedStatus}</h2>
      </div>
      <div
        ref={setNodeRef}
        style={style}
        className="flex-1 rounded-b-lg bg-inherit p-2 space-y-2"
      >
        <SortableContext items={cardIDs}>
          {cards.map(card => (
            <KanbanCard key={card.card_id} card={card} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
