import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/store"
import { fetchProjectOverviewData } from "../../api/projectApi"
import { DatePicker } from "../../components/filter/DatePicker"
import { Dropdown } from "../../components/Dropdown"
import { Button } from "../../components/Button"
import { setStartDate, setEndDate, setStatus } from "./filterSlice"
import { StatusType, statusOptions } from "./filter-types"
import { setProjects } from "../projectList/projectSlice"

export const FilterWindow: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch()

  const handleFilter = async () => {
    if (new Date(filter.startDate) > new Date(filter.endDate)) {
      alert("Start date cannot be after end date!")
      return
    }

    try {
      const projects = await fetchProjectOverviewData({
        startDate: filter.startDate,
        endDate: filter.endDate,
        status: filter.status,
      })
      dispatch(setProjects(projects))
      console.log("Fetched Data:", projects)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc" }}>
      <h3>Filter Options</h3>
      <DatePicker
        label="Start Date"
        value={filter.startDate}
        onChange={date => dispatch(setStartDate(date))}
      />
      <DatePicker
        label="End Date"
        value={filter.endDate}
        onChange={date => dispatch(setEndDate(date))}
      />
      <Dropdown<StatusType>
        label="Status"
        value={filter.status}
        options={statusOptions}
        onChange={status => dispatch(setStatus(status))}
      />
      <Button
        label="Apply Filters"
        onClick={handleFilter}
        className="btn-primary"
      />
    </div>
  )
}
