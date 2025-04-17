import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { fetchStatusListThunk } from "../projects/projectThunks"
import { KanbanColumn } from "./KanbanColumn"
import { sampleProject, sampleProjects, sampleStatus } from "./sampleData"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Card } from "../../types/kanban-types"
import { KanbanCard } from "./KanbanCard"
import { createPortal } from "react-dom"
import { arrayMove } from "@dnd-kit/sortable"

export const KanbanBoard = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const projectStatuses = useSelector(
  //   (state: RootState) => state.status.statuses,
  // )
  // const projects = useSelector((state: RootState) => state.projects.projects)

  //const projects = sampleProjects
  const projectStatuses = sampleStatus
  const [cards, setCards] = React.useState<Card[]>(
    sampleProjects.map(project => ({
      card_id: project.project_id,
      task_status: project.project_info.project_status,
      task_number: project.project_info.project_number,
      task_name: project.project_info.project_name,
      task_leader: project.project_info.project_lead,
    })),
  )
  const [projects, setProjects] =
    React.useState<sampleProject[]>(sampleProjects)
  const [activeCard, setActiveCard] = React.useState<Card | null>(null)
  const columns = projectStatuses.map(status => ({
    column_title: status.status_label,
    column_id: status.status_id,
  }))

  // Fetch statuses when the component mounts
  useEffect(() => {
    dispatch(fetchStatusListThunk())
  }, [dispatch])

  function handleDragStart(event: any) {
    const { active } = event
    if (active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card)
      return
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      return
    }
    if (event.over) {
      console.log(
        "Dropped " + event.active.id + " on droppable area " + event.over.id,
      )
    }

    // TODO: Update projects in the backend
  }

  function handleDragOver(event: any) {
    const { active, over } = event

    // If not over a droppable area or over the active (same) element --> do nothing
    if (!over || active.id === over.id) {
      return
    }

    // Handle dragging over a column
    if (over.data.current?.type === "Column") {
      console.log(
        "Dragging over column: ",
        over.data.current.column.column_title,
      )

      // Update the task_status of the dragged card to match the column
      setCards(cards =>
        cards.map(card =>
          card.card_id === active.id
            ? {
                ...card,
                task_status: over.data.current.column.column_title,
              }
            : card,
        ),
      )
      return // Exit early since no reordering is needed when dragging over a column
    }

    // Handle dragging over another card
    if (over.data.current?.type === "Card") {
      console.log("Dragging over card: ", over.data.current.card.task_number)

      // Update the task_status of the dragged card to match the target card's status
      setCards(cards =>
        cards.map(card =>
          card.card_id === active.id
            ? {
                ...card,
                task_status: over.data.current.card.task_status,
              }
            : card,
        ),
      )
    }

    // Reorder cards within the same column
    setCards(cards => {
      const activeCardIndex = cards.findIndex(
        card => card.card_id === active.id,
      )
      const overCardIndex = cards.findIndex(card => card.card_id === over.id)

      // Only reorder if both cards are in the same column
      if (
        cards[activeCardIndex]?.task_status ===
        cards[overCardIndex]?.task_status
      ) {
        return arrayMove(cards, activeCardIndex, overCardIndex)
      }

      return cards // No changes if cards are in different columns
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col flex-1 p-4 h-full">
        <div className="flex-1 overflow-auto grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.column_id}
              column={column}
              cards={cards.filter(
                card => card.task_status === column.column_title,
              )}
            />
          ))}
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeCard && <KanbanCard card={activeCard} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
