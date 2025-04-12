import { ProjectList } from "../features/projects/ProjectList"
import { Layout } from "../components/layout/Layout"

import React from "react"

export const Overview = () => {
  return (
    <Layout>
      <ProjectList showBudget={false} />
    </Layout>
  )
}
