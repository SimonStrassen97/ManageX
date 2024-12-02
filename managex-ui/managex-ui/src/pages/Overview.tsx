import { Sidebar } from "../layouts/Sidebar"
import { ProjectList } from "../features/projectList/ProjectList"
import { Header } from "../layouts/Header"

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
