// Define an enum for status options
export enum Status {
  STARTED = "started",
  FINISHED = "finished",
  PLANNED = "planned",
}

// Define the state shape
export interface FilterState {
  startDate: string
  endDate: string
  status: Status
}

// Extract an array of the status values
export const statusOptions: Status[] = Object.values(Status)
