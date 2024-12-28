import { Sidebar } from "../components/layout/Sidebar"
import { ProjectList } from "../features/projects/ProjectList"
import { Header } from "../components/layout/Header"
import { Button } from "../components/Button"
import { AddProjectModal } from "../features/projects/AddProjectModal"
import { useState } from "react"

import React from "react"

export const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <ProjectList></ProjectList>
      <Button
        label="Add Project"
        onClick={() => setIsModalOpen(true)}
        className="btn-primary"
      />

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
