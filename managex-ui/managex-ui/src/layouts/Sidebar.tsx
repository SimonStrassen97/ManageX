import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../app/store"
import {
  setStartDate,
  setEndDate,
  setStatus,
} from "../features/filter/filterSlice"
import { StatusType, statusOptions } from "../features/filter/filterSlice"
import { fetchProjectOverviewData } from "../api/projectApi"

export const Sidebar: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch()

  const handleFilter = async () => {
    try {
      const data = await fetchProjectOverviewData({
        startDate: filter.startDate,
        endDate: filter.endDate,
        status: filter.status,
      })
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div>
      <h3>Filters</h3>
      <label>
        Start Date:
        <input
          type="date"
          value={filter.startDate}
          onChange={e => dispatch(setStartDate(e.target.value))}
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="date"
          value={filter.endDate}
          onChange={e => dispatch(setEndDate(e.target.value))}
        />
      </label>
      <br />
      <label>
        Status:
        <select
          value={filter.status}
          onChange={e => dispatch(setStatus(e.target.value as StatusType))}
        >
          <option value="">All</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
              {/* Capitalize the status */}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleFilter}>Filter</button>
    </div>
  )
}
