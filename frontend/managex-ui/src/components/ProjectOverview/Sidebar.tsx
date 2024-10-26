// src/components/ProjectOverview/Sidebar.tsx
import React, { useState } from "react";

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={"bg-primary h-screen p-4"}>
      <h2 className="text-lg font-bold">Filters</h2>
      {/* Add filter options here */}
      <div>
        <label>
          <input type="checkbox" /> Active Projects
        </label>
        <br />
        <label>
          <input type="checkbox" /> Completed Projects
        </label>
      </div>
    </div>
  );
};
