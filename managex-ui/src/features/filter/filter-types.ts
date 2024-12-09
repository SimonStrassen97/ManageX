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
export interface FilterState {
  startDate: string
  endDate: string
  status: StatusType // Use the lowercase StatusType
}
