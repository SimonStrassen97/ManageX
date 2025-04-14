import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchProjectsThunk } from "../projects/projectThunks"
import { DatePicker } from "../../components/DatePicker"
import { Dropdown } from "../../components/Dropdown"
import { Button } from "../../components/Button"
import { setStartDate, setEndDate, setStatus } from "./filterSlice"
import { Status, statusOptions, FilterState } from "../../types/filter-types"
import { RootState, AppDispatch } from "../../app/store"
import { SlidersHorizontal } from "lucide-react"

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
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md">
      <span className="flex items-center text-gray-900 font-bold text-xl">
        <SlidersHorizontal className="h-4 pr-2" />
        Filter Options
      </span>
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
      <Button
        label="Apply Filters"
        onClick={handleFilter}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      />
    </div>
  )
}
