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
  const statusToIdMap = Object.fromEntries(
    projectStatuses.map(status => [status.status_label, status.status_id]),
  )
  const [cards, setCards] = React.useState<Card[]>(
    sampleProjects.map(project => {
      const taskStatus = project.project_info.project_status
      return {
        card_id: 100 + project.project_id, // make sure card_ids and column_ids are never overlapping
        column_id: statusToIdMap[taskStatus],
        task_status: taskStatus,
        task_number: project.project_info.project_number,
        task_name: project.project_info.project_name,
        task_leader: project.project_info.project_lead,
      }
    }),
  )

  const [activeCard, setActiveCard] = React.useState<Card | null>(null)
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
      console.log("Dragging over column: ", over.data.current.column.column_id)

      setCards(cards => {
        const activeIndex = cards.findIndex(card => card.card_id === active.id)

        cards[activeIndex].column_id = over.id
        return arrayMove(cards, activeIndex, activeIndex)
      })
    }

    // Handle dragging over another card
    if (over.data.current?.type === "Card") {
      console.log("Dragging over card: ", over.data.current.card.task_number)

      setCards(cards => {
        const activeIndex = cards.findIndex(card => card.card_id === active.id)
        const overIndex = cards.findIndex(card => card.card_id === over.id)

        cards[activeIndex].column_id = cards[overIndex].column_id

        return arrayMove(cards, activeIndex, overIndex)
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
          {activeCard && <KanbanCard card={activeCard} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
