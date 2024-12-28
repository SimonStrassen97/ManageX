import React from "react"

interface ButtonProps {
  label: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={className} // Default 'btn' class with optional additional styles
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
