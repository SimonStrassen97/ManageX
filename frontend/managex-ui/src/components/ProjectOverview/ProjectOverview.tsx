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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      const data = await fetchProjectOverviewData(); // Can access setProjects directly
      setProjects(data);
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects(); // Call the loadProjects function
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.project_number}>{project.project_number}</li>
      ))}
    </ul>
  );
};
