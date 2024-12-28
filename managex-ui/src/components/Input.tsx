import React from "react"
import { ErrorMessage } from "./ErrorMessage"

interface InputProps {
  label: string
  type: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  required?: boolean
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  error,
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
