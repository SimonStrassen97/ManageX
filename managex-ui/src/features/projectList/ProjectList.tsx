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
              {/* Dynamically generate table headers from Project keys */}
              {Object.keys(projects[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.project_number}>
                {Object.values(project).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No projects available.</p> // Render a fallback message if the array is empty
      )}
    </div>
  )
}
