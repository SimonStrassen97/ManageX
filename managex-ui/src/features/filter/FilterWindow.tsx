import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchProjectsThunk } from "../projects/projectThunks"
import { DatePicker } from "../../components/DatePicker"
import { Dropdown } from "../../components/Dropdown"
import { Button } from "../../components/Button"
import { setStartDate, setEndDate, setStatus } from "./filterSlice"
import { Status, statusOptions, FilterState } from "../../types/filter-types"
import { RootState, AppDispatch } from "../../app/store"

export const FilterWindow: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch<AppDispatch>() // Type-safe dispatch

  useEffect(() => {
    // Fetch projects only if the filter state has changed
    dispatch(fetchProjectsThunk(filter))
  }, [dispatch])

  const handleFilter = () => {
    if (new Date(filter.startDate) > new Date(filter.endDate)) {
      alert("Start date cannot be after end date!")
      return
    }

    try {
      dispatch(fetchProjectsThunk(filter))
    } catch (error) {
      console.error("Error dispatching thunk:", error)
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
      <Dropdown<Status>
        label="Status"
        value={filter.status}
        options={statusOptions}
        onChange={status => dispatch(setStatus(status))}
      />
      <Button label="Apply Filters" onClick={handleFilter} />
    </div>
  )
}
