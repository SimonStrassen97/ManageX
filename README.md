<<<<<<< HEAD

# Django + React Project Management Tool

## Goal

Create a full-stack web application where users can manage ongoing projects and higher management can view and control projects. The app will offer features for project tracking, task management, reporting, and automation.

---

## Planned Features

### 1. **Project Overview**

- Display all projects in a centralized view.
- **Filter Options**:
  - Filter projects by name, status (e.g., active, completed), timeline, or manager.
  - Sort by priority, deadline, or project owner.

### 2. **Gantt Chart View**

- Visual representation of project timelines.
- **Filter Options**:
  - Filter by project status, department, or due date.
  - Zoom in/out for detailed or high-level views.

### 3. **My Projects**

- Personalized view for users to manage their assigned projects.
- **Actions**:
  - Create, edit, or delete projects.
  - Update project progress.
  - Assign team members to specific tasks.

### 4. **Project Analytics**

- Dashboard with project analytics
- Automatically calculate project metrics (RAG status, deadlines, etc.).
- Export reports to PDF/Excel formats.

### 5. **Project Reporting System**

- Reporting for PLs
- generate/suggest report based on info in db

### 6. **Task Management System**

- Automatically creates tasks/notifications when a user is required to perform an action.
- **Example Tasks**:
  - Project status updates (daily/weekly/monthly reports).
  - Admin confirmations (project approvals, budget requests).
- Integration with email notifications for pending tasks.

### 7. **LLM Chat Bot Integration**

- Use a language model (LLM) to provide intelligent project assistance.
- **Functionalities**:
  - Provide information about projects with RAG (Red, Amber, Green) status.
  - Extract and summarize relevant information from uploaded files (e.g., project proposals, reports).
  - Automatically create project instances in the database from parsed data.

---

## Technology Stack

- **Backend**: Django
- **Frontend**: React
- **Database**: PostgreSQL
- **Charts**: ?
- **Notifications**: ?
- **Email**: ?
- **LLM Chat Bot**: ?

---

## Development Phases

### Phase 1: Initial Setup

- Set up the Django backend and React frontend.
- Create the basic models for users, projects, and tasks.

### Phase 2: Project Management

- Implement the project overview and My Projects pages.
- Develop CRUD (Create, Read, Update, Delete) operations for projects.

### Phase 3: Gantt Chart and Visualization

- Integrate D3.js or Chart.js for the Gantt chart.
- Add filtering options for visualized data.

### Phase 4: Test deployment

- Dockerize everything
- Learn about cloud deployment
- Implement role-based access control (RBAC) for different user types (PLs, PPM, Admin).

### Phase 5: Analytics Dashboard

- Crate overview dashboard

### Phase 6: Task Management and Notifications

- Implement the task system with automated notifications.

### Phase 7: LLM Chat Bot Integration

- Integrate the language model for intelligent responses and file parsing.

### Phase 8: Final Testing and Deployment

- Perform end-to-end testing of all features.
- Deploy the application to a cloud provider (e.g., AWS, Heroku).

---

## Future Improvements

- CI/CD pipeline
- Integrate real-time project updates using WebSockets
- Add support for customizable project structures

---
