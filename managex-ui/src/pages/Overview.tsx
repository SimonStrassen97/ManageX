import { ProjectList } from "../features/projects/ProjectList"
import { Layout } from "../components/layout/Layout"

import React from "react"

export const Overview = () => {
  return (
    <Layout title="Project Overview">
      <ProjectList showBudget={false} />
    </Layout>
  )
}
