import { ProjectList } from "../features/projects/ProjectList"
import { Layout } from "../components/layout/Layout"

import React from "react"

export const Overview = () => {
  return (
    <Layout>
      <h1 className="text-gray-900 font-bold text-xl mb-4">Project Overview</h1>
      <ProjectList showBudget={false} />
    </Layout>
  )
}
