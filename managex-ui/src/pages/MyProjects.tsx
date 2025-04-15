import React from "react"
import { Layout } from "../components/layout/Layout"
import { ProjectList } from "../features/projects/ProjectList"
import { AddProjectModal } from "../features/projects/AddProjectModal"
import { Button } from "../components/Button"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Navigate } from "react-router-dom"
import { PlusCircle, Plus } from "lucide-react"

export const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentUser = useSelector((state: RootState) => state.currentuser.user)

  // Redirect to login if currentUser is null
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return (
    <Layout title="My Projects">
      <ProjectList showBudget={true} filterByUser={currentUser.username} />
      <Button
        label="Add Project"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
        svg={<Plus className="h-4" />}
      />
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  )
}
