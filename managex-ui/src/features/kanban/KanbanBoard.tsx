import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import {
  fetchStatusListThunk,
  updateProjectThunk,
} from "../projects/projectThunks"
import { KanbanColumn } from "./KanbanColumn"
import { sampleProject, sampleProjects, sampleStatus } from "./sampleData"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Card, Column } from "../../types/kanban-types"
import { KanbanCard } from "./KanbanCard"
import { createPortal } from "react-dom"
import { arrayMove } from "@dnd-kit/sortable"

export const KanbanBoard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const projectStatuses = useSelector(
    (state: RootState) => state.status.statuses,
  )

  const projects = useSelector((state: RootState) => state.projects.projects)

  const statusToIdMap = Object.fromEntries(
    projectStatuses.map(status => [status.status_label, status.status_id]),
  )

  const [cards, setCards] = React.useState<Card[]>([])

  useEffect(() => {
    if (projects.length > 0 && projectStatuses.length > 0) {
      const statusToIdMap = Object.fromEntries(
        projectStatuses.map(status => [status.status_label, status.status_id]),
      )

      const mappedCards: Card[] = projects.map(project => {
        const taskStatus = project.project_info.project_status
        return {
          card_id: 100 + project.project_id,
          column_id: statusToIdMap[taskStatus],
          task_status: taskStatus,
          task_number: project.project_info.project_number,
          task_name: project.project_info.project_name,
          task_leader: project.project_info.project_lead,
        }
      })

      setCards(mappedCards)
    }
  }, [projects, projectStatuses])

  const [sourceCard, setSourceCard] = React.useState<Card | null>(null)
  const columns = projectStatuses.map(status => ({
    column_id: status.status_id,
    column_title: status.status_label,
  }))

  // Fetch statuses when the component mounts
  useEffect(() => {
    dispatch(fetchStatusListThunk())
  }, [dispatch])

  function handleDragStart(event: any) {
    const { active } = event
    if (active.data.current?.type === "Card") {
      // Create a shallow copy of the card to avoid mutating the original reference
      setSourceCard({ ...event.active.data.current.card })
      return
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event

    // Find the dragged card
    const changedCard = cards.find(card => card.card_id === active.id)
    if (!changedCard || !sourceCard) {
      console.error("Source or target card not found")
      return
    }

    const oldColumnId = sourceCard.column_id
    const newColumnId = changedCard.column_id
    if (newColumnId !== oldColumnId) {
      // Update the card's column_id to the new column

      const updatedProject = {
        project_id: sourceCard.card_id - 100, // Reverse the card_id logic to get the project_id
        new_status_id: newColumnId,
      }
      // Dispatch the asyncThunk to update the backend
      dispatch(
        updateProjectThunk({
          project_id: sourceCard.card_id - 100, // Reverse the card_id logic to get the project_id
          updates: { project_status_id: newColumnId }, // Only update the status
        }),
      )
    }

    // TODO: Update projects in the backend

    setSourceCard(null)
  }

  function handleDragOver(event: any) {
    const { active, over } = event

    // If not over a droppable area or over the active (same) element --> do nothing
    if (!over || active.id === over.id) {
      return
    }

    // Handle dragging over a column
    if (over.data.current?.type === "Column") {
      console.log("Dragging over column: ", over.data.current.column.column_id)

      setCards(cards => {
        const newCards = [...cards]
        const activeIndex = newCards.findIndex(
          card => card.card_id === active.id,
        )

        newCards[activeIndex].column_id = over.id
        return arrayMove(newCards, activeIndex, activeIndex)
      })
    }

    // Handle dragging over another card
    if (over.data.current?.type === "Card") {
      console.log("Dragging over card: ", over.data.current.card.task_number)

      setCards(cards => {
        const newCards = [...cards]
        const activeIndex = newCards.findIndex(
          card => card.card_id === active.id,
        )
        const overIndex = newCards.findIndex(card => card.card_id === over.id)

        newCards[activeIndex].column_id = newCards[overIndex].column_id

        return arrayMove(newCards, activeIndex, overIndex)
      })
    }
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
              cards={cards.filter(card => card.column_id === column.column_id)}
            />
          ))}
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {sourceCard && <KanbanCard card={sourceCard} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
