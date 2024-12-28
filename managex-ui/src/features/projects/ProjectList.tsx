import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

export const ProjectList = () => {
  // Ensure projects is properly typed as Project[]
  const projects = useSelector((state: RootState) => state.projects.projects)

  return (
    <div>
      <h2>Project List</h2>
      {projects.length > 0 ? ( // Check if there are projects
        <table>
          <thead>
            <tr>
              {/* Define table headers explicitly */}
              <th>Project Number</th>
              <th>Project Name</th>
              <th>Project Lead</th>
              <th>Status</th>
              <th>Budget (Amount)</th>
              <th>Budget (Currency)</th>
              <th>Timeline (Start Date)</th>
              <th>Timeline (Finish Date)</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.project_number}>
                <td>{project.project_number}</td>
                <td>{project.project_info.project_name}</td>
                <td>{project.project_info.project_lead}</td>
                <td>{project.project_info.project_status}</td>
                <td>{project.budget?.amount || "N/A"}</td>
                <td>{project.budget?.currency.currency_label || "N/A"}</td>
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
        <p>No projects available.</p> // Fallback if no projects exist
      )}
    </div>
  )
}
