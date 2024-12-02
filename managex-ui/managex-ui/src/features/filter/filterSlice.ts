import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the state shape
interface FiltersState {
  startDate: string
  endDate: string
  status: string
}

// Initial state
const initialState: FiltersState = {
  startDate: "",
  endDate: "",
  status: "",
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
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

// Named export for the reducer
export const filterReducer = filtersSlice.reducer

// Named exports for the actions
export const { setStartDate, setEndDate, setStatus } = filtersSlice.actions
