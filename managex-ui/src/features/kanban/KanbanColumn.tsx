import React from "react"
import { KanbanCard } from "./KanbanCard"
import { Project } from "../../types/project-types"

interface KanbanColumnProps {
  status: string
  projects: Project[]
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  projects,
}) => {
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()

  return (
    <div className="bg-gray-300 rounded-lg shadow-md flex flex-col h-full">
      {/* Sticky title: */}
      <div className="sticky rounded-lg top-0 bg-gray-300 z-10 p-4">
        <h2 className="text-lg font-bold text-gray-500">{formattedStatus}</h2>
      </div>
      {/* Scrollable content: */}
      <div className="flex-1 rounded-lg overflow-y-auto p-2 space-y-2">
        {projects.map(project => (
          <KanbanCard
            key={project.project_id}
            card={{
              card_name: project.project_info.project_name,
              card_number: project.project_info.project_number,
              card_leader: project.project_info.project_lead,
            }}
          />
        ))}
      </div>
    </div>
  )
}
