import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterState, Status } from "./filter-types"

const initialState: FilterState = {
  startDate: "",
  endDate: "",
  status: Status.STARTED, // Use lowercase Status values
}

// Create the slice
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
    },
  },
})

// Named export for the reducer
export const filterReducer = filterSlice.reducer

// Named exports for the actions
export const { setStartDate, setEndDate, setStatus } = filterSlice.actions
