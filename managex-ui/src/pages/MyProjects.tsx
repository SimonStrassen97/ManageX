import React from "react"
import { Sidebar } from "../components/layout/Sidebar"
import { Header } from "../components/layout/Header"
import { ProjectList } from "../features/projects/ProjectList"
import { AddProjectModal } from "../features/projects/AddProjectModal"
import { Button } from "../components/Button"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"

export const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentUser = useSelector((state: RootState) => state.currentuser.user)

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="content">
        <h1>My Projects</h1>
        <ProjectList showBudget={true} filterByUser={currentUser.username} />
      </div>
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
