import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { ListCell } from "./ProjectListCell"

interface ProjectListProps {
  showBudget: boolean
  filterByUser?: string
}

export const ProjectList: React.FC<ProjectListProps> = ({
  showBudget,
  filterByUser,
}) => {
  const projects = useSelector((state: RootState) => state.projects.projects)
  const filteredProjects = filterByUser
    ? projects.filter(
        project => project.project_info.project_lead === filterByUser,
      )
    : projects

  return (
    <div className="flex flex-1 w-full p-4">
      <div className="flex flex-col w-full shadow-lg overflow-auto rounded-md">
        {filteredProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-300 border">
                  <ListCell as="th">Project Number</ListCell>
                  <ListCell as="th">Project Name</ListCell>
                  <ListCell as="th">Project Lead</ListCell>
                  <ListCell as="th">Status</ListCell>
                  {showBudget && <ListCell as="th">Budget (Amount)</ListCell>}
                  {showBudget && <ListCell as="th">Budget (Currency)</ListCell>}
                  <ListCell as="th">Timeline (Start Date)</ListCell>
                  <ListCell as="th">Timeline (Finish Date)</ListCell>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => (
                  <tr
                    key={project.project_id}
                    className="text-gray-700 hover:bg-blue-600 hover:text-white"
                  >
                    <ListCell className="border-gray-300">
                      {project.project_info.project_number}
                    </ListCell>
                    <ListCell className="border-gray-300">
                      {project.project_info.project_name}
                    </ListCell>
                    <ListCell className="border-gray-300">
                      {project.project_info.project_lead}
                    </ListCell>
                    <ListCell className="border-gray-300">
                      {project.project_info.project_status}
                    </ListCell>
                    {showBudget && (
                      <ListCell className="border-gray-300">
                        {project.budget?.amount || "N/A"}
                      </ListCell>
                    )}
                    {showBudget && (
                      <ListCell className="border-gray-300">
                        {project.budget?.currency_label || "N/A"}
                      </ListCell>
                    )}
                    <ListCell className="border-gray-300">
                      {new Date(
                        project.timeline.start_date,
                      ).toLocaleDateString()}
                    </ListCell>
                    <ListCell className="border-gray-300">
                      {new Date(
                        project.timeline.finish_date,
                      ).toLocaleDateString()}
                    </ListCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No projects available.</p>
        )}
      </div>
    </div>
  )
}
