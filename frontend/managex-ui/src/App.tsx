import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProjectList } from "./components/ProjectOverview/ProjectOverview";
import { GanttChart } from "./components/Gantt/GanttChart";
import { Navbar } from "./components/Navbar/Navbar";

// Define the Route type
interface RouteConfig {
  path: string;
  label: string;
  component: React.ReactNode; // ReactNode is used here for the component
}

// Define the routes array with explicit typing
const routes: RouteConfig[] = [
  { path: "/projects", label: "Projects", component: <ProjectList /> },
  { path: "/gantt", label: "Gantt", component: <GanttChart /> },
  {
    path: "/",
    label: "Home",
    component: <h3>Welcome to the Project Management App</h3>,
  },
];

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar routes={routes} />
          <Routes>
            {routes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
