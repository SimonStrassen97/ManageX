import { NewUser } from "./user-types"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const NAME_REGEX = /^[A-Za-z]+$/

interface ValidationData extends NewUser {
  confirmPassword: string
}

export const validateNewUser = (
  data: ValidationData,
): Record<string, string> => {
  const newErrors: Record<string, string> = {}

  // Username validation
  const trimmedUsername = data.username.trim()
  if (!trimmedUsername) {
    newErrors.username = "Username is required"
  } else if (trimmedUsername !== data.username) {
    newErrors.username = "Username cannot contain spaces"
  } else if (!USERNAME_REGEX.test(trimmedUsername)) {
    newErrors.username =
      "Username must be 3-20 characters and can only contain letters, numbers, and underscores"
  }

  // First name validation
  const trimmedFirstName = data.first_name.trim()
  if (!trimmedFirstName) {
    newErrors.first_name = "First name is required"
  } else if (trimmedFirstName !== data.first_name) {
    newErrors.first_name = "First name cannot contain spaces"
  } else if (!NAME_REGEX.test(trimmedFirstName)) {
    newErrors.first_name = "First name can only contain letters"
  } else if (trimmedFirstName.length > 30) {
    newErrors.first_name = "First name cannot exceed 30 characters"
  }

  // Last name validation
  const trimmedLastName = data.last_name.trim()
  if (!trimmedLastName) {
    newErrors.last_name = "Last name is required"
  } else if (trimmedLastName !== data.last_name) {
    newErrors.last_name = "Last name cannot contain spaces"
  } else if (!NAME_REGEX.test(trimmedLastName)) {
    newErrors.last_name = "Last name can only contain letters"
  } else if (trimmedLastName.length > 30) {
    newErrors.last_name = "Last name cannot exceed 30 characters"
  }

  // Email validation
  const trimmedEmail = data.email.trim()
  if (!trimmedEmail) {
    newErrors.email = "Email is required"
  } else if (trimmedEmail !== data.email) {
    newErrors.email = "Email cannot contain spaces"
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    newErrors.email = "Please enter a valid email address"
  }

  // Password validation
  const trimmedPassword = data.password.trim()
  if (!trimmedPassword) {
    newErrors.password = "Password is required"
  } else if (trimmedPassword !== data.password) {
    newErrors.password = "Password cannot contain spaces"
  } else if (!PASSWORD_REGEX.test(trimmedPassword)) {
    newErrors.password =
      "Password must be at least 8 characters long and contain at least one letter, one number, and one special character"
  }

  // Password confirmation validation
  if (data.password !== data.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match"
  }

  return newErrors
}

export const isFormValid = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length === 0
}
