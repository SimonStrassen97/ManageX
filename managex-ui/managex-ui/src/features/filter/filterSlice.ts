import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// types.ts

// Define a constant object for status options (with lowercase values)
export const Status = {
  STARTED: "started",
  FINISHED: "finished",
  PLANNED: "planned",
} as const // `as const` ensures the type is literal

// Define StatusType based on the object values (lowercase)
export type StatusType = (typeof Status)[keyof typeof Status]

// Extract an array of the status values
export const statusOptions: StatusType[] = Object.values(Status)

// Define the state shape
interface FiltersState {
  startDate: string
  endDate: string
  status: StatusType // Use the lowercase StatusType
}

const initialState: FiltersState = {
  startDate: "",
  endDate: "",
  status: Status.STARTED, // Use lowercase Status values
}

// Create the slice
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload
    },
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload
    },
  },
})

// Named export for the reducer
export const filterReducer = filtersSlice.reducer

// Named exports for the actions
export const { setStartDate, setEndDate, setStatus } = filtersSlice.actions
