import React from "react"

interface DropdownProps<T> {
  label: string
  value: T
  options: T[]
  onChange: (value: T) => void
  disable_all?: boolean
}

export const Dropdown = <T extends string | number>({
  label,
  value,
  options,
  onChange,
  disable_all = false,
}: DropdownProps<T>) => {
  return (
    <div>
      <label>
        {label}:
        <select value={value} onChange={e => onChange(e.target.value as T)}>
          {!disable_all && (
            <option value="">
              All
            </option>
          )}
          {options.map(option => (
            <option key={option} value={option}>
              {String(option).charAt(0).toUpperCase() + String(option).slice(1)}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
