import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../app/store"
import {
  setStartDate,
  setEndDate,
  setStatus,
} from "../features/filter/filterSlice"

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const { startDate, endDate, status } = useSelector(
    (state: RootState) => state.filter,
  )

  const handleFilter = () => {
    console.log("Filters Applied:", { startDate, endDate, status })
  }

  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      <div className="filter-section">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={e => dispatch(setStartDate(e.target.value))}
        />
      </div>

      <div className="filter-section">
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={e => dispatch(setEndDate(e.target.value))}
        />
      </div>

      <div className="filter-section">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={e => dispatch(setStatus(e.target.value))}
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>

      <button className="filter-button" onClick={handleFilter}>
        Apply Filters
      </button>
    </aside>
  )
}
