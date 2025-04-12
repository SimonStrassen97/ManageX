import React from "react"
import { Layout } from "../components/layout/Layout"
import { ProjectList } from "../features/projects/ProjectList"
import { AddProjectModal } from "../features/projects/AddProjectModal"
import { Button } from "../components/Button"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Navigate } from "react-router-dom"

export const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentUser = useSelector((state: RootState) => state.currentuser.user)

  // Redirect to login if currentUser is null
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return (
    <Layout>
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
    </Layout>
  )
}
