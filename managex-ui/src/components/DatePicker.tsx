import React from "react"

interface DatePickerProps {
  label: string
  value: string
  onChange: (date: string) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <label>
        {label}:
        <input
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}
