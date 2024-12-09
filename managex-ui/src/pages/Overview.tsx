import { Sidebar } from "../components/layout/Sidebar"
import { ProjectList } from "../features/projectList/ProjectList"
import { Header } from "../components/layout/Header"

import React from "react"

export const Overview = () => {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <ProjectList></ProjectList>
    </>
  )
}
