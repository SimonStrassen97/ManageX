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

  return (
    <div>
      <h2>Project List</h2>
      {filteredProjects.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Project Number</th>
              <th>Project Name</th>
              <th>Project Lead</th>
              <th>Status</th>
              {showBudget && <th>Budget (Amount)</th>}
              {showBudget && <th>Budget (Currency)</th>}
              <th>Timeline (Start Date)</th>
              <th>Timeline (Finish Date)</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.project_id}>
                <td>{project.project_info.project_number}</td>
                <td>{project.project_info.project_name}</td>
                <td>{project.project_info.project_lead}</td>
                <td>{project.project_info.project_status}</td>
                {showBudget && <td>{project.budget?.amount || "N/A"}</td>}
                {showBudget && (
                  <td>{project.budget?.currency_label || "N/A"}</td>
                )}
                <td>
                  {new Date(project.timeline.start_date).toLocaleDateString()}
                </td>
                <td>
                  {new Date(project.timeline.finish_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  )
}
