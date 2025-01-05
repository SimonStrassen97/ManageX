import React from "react"
import { ErrorMessage } from "./ErrorMessage"

interface DatePickerProps {
  label: string
  value: string | undefined
  onChange: (date: string) => void
  required?: boolean
  error?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div>
      <label>
        {label}:
        <input
          type="date"
          value={value}
          required={required}
          onChange={e => onChange(e.target.value)}
        />
      </label>
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
