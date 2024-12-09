import React from "react"

type ButtonProps = {
  label: string // Text to display on the button
  onClick: () => void // Function to handle button click
  type?: "button" | "submit" | "reset" // Button type
  className?: string // Additional CSS classes for styling
  disabled?: boolean // Disable button functionality
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
      className={`btn ${className}`} // Default 'btn' class with optional additional styles
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
