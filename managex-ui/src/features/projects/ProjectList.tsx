import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

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

  // Define a reusable class for table cells
  const cellClass = "px-4 py-2 border border-gray-300 text-sm"

  return (
    <div className="bg-white">
      {filteredProjects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className={cellClass}>Project Number</th>
                <th className={cellClass}>Project Name</th>
                <th className={cellClass}>Project Lead</th>
                <th className={cellClass}>Status</th>
                {showBudget && <th className={cellClass}>Budget (Amount)</th>}
                {showBudget && <th className={cellClass}>Budget (Currency)</th>}
                <th className={cellClass}>Timeline (Start Date)</th>
                <th className={cellClass}>Timeline (Finish Date)</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr
                  key={project.project_id}
                  className="text-gray-700 hover:bg-blue-600 hover:text-white"
                >
                  <td className={cellClass}>
                    {project.project_info.project_number}
                  </td>
                  <td className={cellClass}>
                    {project.project_info.project_name}
                  </td>
                  <td className={cellClass}>
                    {project.project_info.project_lead}
                  </td>
                  <td className={cellClass}>
                    {project.project_info.project_status}
                  </td>
                  {showBudget && (
                    <td className={cellClass}>
                      {project.budget?.amount || "N/A"}
                    </td>
                  )}
                  {showBudget && (
                    <td className={cellClass}>
                      {project.budget?.currency_label || "N/A"}
                    </td>
                  )}
                  <td className={cellClass}>
                    {new Date(project.timeline.start_date).toLocaleDateString()}
                  </td>
                  <td className={cellClass}>
                    {new Date(
                      project.timeline.finish_date,
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No projects available.</p>
      )}
    </div>
  )
}
