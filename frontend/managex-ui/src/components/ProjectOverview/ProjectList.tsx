import React, { useEffect, useState } from "react";
import { fetchProjectOverviewData } from "../../services/services";

interface Project {
  project_name: string;
  project_number: string;
  project_lead: string;
  project_status: string;
  confirmed_project_status: string;
  DATECREATE: string;
}

export const ProjectList: React.FC = () => {
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // const loadProjects = async () => {
  //   try {
  //     const data = await fetchProjectOverviewData(); // Can access setProjects directly
  //     setProjects(data);
  //   } catch (err) {
  //     setError("Failed to fetch projects");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadProjects(); // Call the loadProjects function
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const projects: Project[] = [
    {
      project_name: "Website Redesign",
      project_number: "PRJ001",
      project_lead: "Alice Johnson",
      project_status: "In Progress",
      confirmed_project_status: "Confirmed",
      DATECREATE: "2023-09-01",
    },
    {
      project_name: "Mobile App Development",
      project_number: "PRJ002",
      project_lead: "Bob Williams",
      project_status: "Pending",
      confirmed_project_status: "Pending Confirmation",
      DATECREATE: "2023-10-15",
    },
    {
      project_name: "Marketing Campaign",
      project_number: "PRJ003",
      project_lead: "Charlie Davis",
      project_status: "Completed",
      confirmed_project_status: "Confirmed",
      DATECREATE: "2023-11-01",
    },
    {
      project_name: "Cloud Migration",
      project_number: "PRJ004",
      project_lead: "Diana Smith",
      project_status: "In Progress",
      confirmed_project_status: "Confirmed",
      DATECREATE: "2023-08-20",
    },
  ];

  const headers = projects.length > 0 ? Object.keys(projects[0]) : [];

  return (
    <table className="m-4 table-auto text-text dark:text-text-dm bg-bg dark:bg-bg-dm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="pr-4 pl-4 border border-text dark:border-text-dm bg-bg-dark dark:bg-bg-dm-light"
            >
              {header.replace(/_/g, " ").toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr
            key={project.project_number}
            className="even:bg-bg-dark dark:even:bg-bg-dm-light hover:bg-primary"
          >
            {headers.map((key) => (
              <td
                key={key}
                className="text-center border border-text dark:border-text-dm"
              >
                {project[key as keyof Project]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
