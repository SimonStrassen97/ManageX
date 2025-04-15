import React from "react"
import { Layout } from "../components/layout/Layout"
import { KanbanBoard } from "../features/kanban/KanbanBoard"

export const Kanban = () => {
  return (
    <Layout title="Kanban Board">
      <KanbanBoard />
    </Layout>
  )
}
