import React from "react"
import { ErrorMessage } from "./ErrorMessage"

interface DropdownProps<T> {
  label: string
  value: T
  options: T[]
  onChange: (value: T) => void
  disable_all?: boolean
  error?: string | null
}

export const Dropdown = <T extends string | number>({
  label,
  value,
  options,
  onChange,
  disable_all = false,
  error = null,
}: DropdownProps<T>) => {
  return (
    <div className="flex flex-col py-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:ring-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        {!disable_all && <option value="">All</option>}
        {options.map(option => (
          <option key={option} value={option}>
            {String(option).charAt(0).toUpperCase() + String(option).slice(1)}
          </option>
        ))}
      </select>
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
