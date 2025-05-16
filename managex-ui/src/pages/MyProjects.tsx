import React from "react"
import { Layout } from "../components/layout/Layout"
import { ProjectList } from "../features/projects/ProjectList"
import { ProjectModal } from "../features/projects/AddProjectModal"
import { Button } from "../components/Button"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Navigate } from "react-router-dom"
import { PlusCircle, Plus } from "lucide-react"
import { Project } from "../types/project-types"

export const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | null>(null)
  const currentUser = useSelector((state: RootState) => state.currentuser.user)

  // Redirect to login if currentUser is null
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  const handleEdit = (project: Project) => {
    setEditProject(project)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditProject(null)
  }

  return (
    <>
      <Layout title="My Projects">
        <ProjectList
          showBudget={true}
          filterByUser={currentUser.username}
          onEdit={handleEdit}
        />
        <Button
          label="Add Project"
          onClick={() => {
            setEditProject(null)
            setIsModalOpen(true)
          }}
          className="m-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
          svg={<Plus className="h-4" />}
        />
      </Layout>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleClose}
        project={editProject}
        mode={editProject ? "edit" : "add"}
      />
    </>
  )
}
