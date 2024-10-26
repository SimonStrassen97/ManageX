// src/components/ProjectOverview/ProjectOverview.tsx
import React from "react";
import { Sidebar } from "./Sidebar";
import { ProjectList } from "./ProjectList";

export const ProjectOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-4 mt-16">
      <div className="cols-span-1 h-screen overflow-y-auto">
        <Sidebar />
      </div>
      <div className="col-span-3 overflow-y-auto">
        <ProjectList />
      </div>
    </div>
  );
};
