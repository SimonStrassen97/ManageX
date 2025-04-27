import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import {
  fetchStatusListThunk,
  updateProjectThunk,
} from "../projects/projectThunks"
import { KanbanColumn } from "./KanbanColumn"
import { fetchKanbanOrder, updateKanbanOrder } from "../../api/projectApi"
import { sampleProject, sampleProjects, sampleStatus } from "./sampleData"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Card, Column } from "../../types/kanban-types"
import { KanbanCard } from "./KanbanCard"
import { createPortal } from "react-dom"
import { arrayMove } from "@dnd-kit/sortable"

export const KanbanBoard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [cards, setCards] = React.useState<Card[]>([])
  const [sourceCard, setSourceCard] = React.useState<Card | null>(null)
  const projectStatuses = useSelector(
    (state: RootState) => state.status.statuses,
  )
  const projects = useSelector((state: RootState) => state.projects.projects)
  const getColumnCards = React.useCallback(
    (columnId: number) => {
      return cards.filter(card => card.column_id === columnId)
    },
    [cards],
  )
  const columns = projectStatuses.map(status => ({
    column_id: status.status_id,
    column_title: status.status_label,
  }))

  useEffect(() => {
    dispatch(fetchStatusListThunk())
  }, [dispatch])

  // TODO: need this to set cards with projects,
  // but this reshuffles when projects change,
  // which it does after every drag event that cahnges column and updates backend
  useEffect(() => {
    if (projects.length > 0 && projectStatuses.length > 0) {
      const statusToIdMap = Object.fromEntries(
        projectStatuses.map(status => [status.status_label, status.status_id]),
      )

      const initialCards: Card[] = projects.map(project => {
        const taskStatus = project.project_info.project_status
        return {
          card_id: 100 + project.project_id,
          column_id: statusToIdMap[taskStatus],
          task_number: project.project_info.project_number,
          task_name: project.project_info.project_name,
          task_leader: project.project_info.project_lead,
        }
      })

      setCards(initialCards)
    }
  }, [projectStatuses, projects])

  useEffect(() => {
    const loadOrder = async () => {
      const orderRes = await fetchKanbanOrder()
      const order = orderRes.data
      const statusToIdMap = Object.fromEntries(
        projectStatuses.map(status => [status.status_label, status.status_id]),
      )
      // Sort projects according to the order array
      const orderedProjects = order
        .map(entry => projects.find(p => p.project_id === entry.project_id))
        .filter((project): project is (typeof projects)[number] => !!project)

      setCards(
        orderedProjects.map(project => {
          const taskStatus = project.project_info.project_status
          return {
            card_id: 100 + project.project_id,
            column_id: statusToIdMap[taskStatus],
            task_number: project.project_info.project_number,
            task_name: project.project_info.project_name,
            task_leader: project.project_info.project_lead,
          }
        }),
      )
    }
    if (projects.length > 0 && projectStatuses.length > 0) {
      loadOrder()
    }
  }, [projects, projectStatuses])

  function moveCard(cards: Card[], active: any, over: any) {
    const newCards = [...cards]
    const activeIndex = newCards.findIndex(card => card.card_id === active.id)
    const overIndex = newCards.findIndex(card => card.card_id === over.id) // will be -1 if over a column --> move to end of column
    // handgle dragging over a card
    if (over.data.current?.type === "Card") {
      newCards[activeIndex] = {
        ...newCards[activeIndex],
        column_id: newCards[overIndex].column_id,
      }
    }
    //handle dragging over a column
    else if (over.data.current?.type === "Column") {
      newCards[activeIndex] = {
        ...newCards[activeIndex],
        column_id: over.id,
      }
    }
    return arrayMove(newCards, activeIndex, overIndex)
  }

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

    if (!over || active.id === over.id) {
      setSourceCard(null)
      return
    }

    setCards(prevCards => {
      const newCards = moveCard(prevCards, active, over)
      // Find the dragged card in the new state
      const changedCard = newCards.find(card => card.card_id === active.id)
      if (changedCard && sourceCard) {
        const oldColumnId = sourceCard.column_id
        const newColumnId = changedCard.column_id
        if (newColumnId !== oldColumnId) {
          const updatedProject = {
            project_id: sourceCard.card_id - 100,
            updates: { project_status_id: newColumnId },
          }
          dispatch(updateProjectThunk(updatedProject))
        }
      }
      // Build KanbanOrder as array of { project_id, order }
      const kanbanOrder = newCards.map((card, idx) => ({
        project_id: card.card_id - 100,
        order: idx,
      }))
      updateKanbanOrder(kanbanOrder)
      return newCards
    })

    setSourceCard(null)
  }

  function handleDragOver(event: any) {
    const { active, over } = event

    // If not over a droppable area or over the active (same) element --> do nothing
    if (!over || active.id === over.id) {
      return
    }
    setCards(cards => moveCard(cards, active, over))
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
              cards={getColumnCards(column.column_id)}
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
