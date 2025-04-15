import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../app/store"
import { fetchStatusListThunk } from "../projects/projectThunks"
import { KanbanColumn } from "./KanbanColumn"

export const KanbanBoard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const projectStatuses = useSelector(
    (state: RootState) => state.status.statuses,
  )
  const loading = useSelector((state: RootState) => state.status.loading)
  const error = useSelector((state: RootState) => state.status.error)

  const projects = useSelector((state: RootState) => state.projects.projects)

  // Fetch statuses when the component mounts
  useEffect(() => {
    dispatch(fetchStatusListThunk())
  }, [dispatch])

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex-grow overflow-x-auto">
        {loading && <p>Loading statuses...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-4 h-full">
            {projectStatuses.map(status => (
              <KanbanColumn
                status={status.status_label}
                projects={projects.filter(
                  project =>
                    project.project_info.project_status === status.status_label,
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
