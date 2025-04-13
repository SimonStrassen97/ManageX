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
    <div className="flex flex-col space-y-2 py-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
