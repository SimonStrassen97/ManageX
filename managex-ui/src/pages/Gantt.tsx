import React from "react"
import { GanttChart } from "../features/gantt/GanttChart"
import { Layout } from "../components/layout/Layout"

export const Gantt = () => {
  return (
    <Layout title="Gantt Chart">
      <GanttChart />
    </Layout>
  )
}
