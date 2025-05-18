import React from "react"

interface ButtonProps {
  children?: React.ReactNode // Add support for an optional SVG/icon
  label: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children} {/* Render the icon if provided */}
      <span>{label}</span> {/* Render the button label */}
    </button>
  )
}
