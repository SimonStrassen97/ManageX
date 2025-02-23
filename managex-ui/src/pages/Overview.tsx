import { Sidebar } from "../components/layout/Sidebar"
import { ProjectList } from "../features/projects/ProjectList"
import { Header } from "../components/layout/Header"

import React from "react"

export const Overview = () => {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <ProjectList showBudget={false} />
    </>
  )
}
