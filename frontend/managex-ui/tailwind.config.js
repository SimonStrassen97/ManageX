/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your component paths
  ],
  darkMode: "class", // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#B3C7E6", // Light shade of primary for light mode
          DEFAULT: "#4C51BF", // Default primary color (indigo 600)
          dark: "#3F2A75", // Darker shade of primary for light mode
        },
        "primary-dm": {
          light: "#6A6F9B", // Light shade of primary for dark mode
          DEFAULT: "#4C51BF", // Default primary color (indigo 600) for dark mode
          dark: "#2C2A50", // Darker shade of primary for dark mode
        },
        secondary: {
          light: "#D5F2E3", // Light shade of secondary for light mode
          DEFAULT: "#48BB78", // Default secondary color (green 500)
          dark: "#2F855A", // Darker shade of secondary for light mode
        },
        "secondary-dm": {
          light: "#68D391", // Light shade of secondary for dark mode
          DEFAULT: "#38A169", // Default secondary color for dark mode
          dark: "#276749", // Darker shade of secondary for dark mode
        },
        tertiary: {
          light: "#F6D3A2", // Light shade of tertiary for light mode
          DEFAULT: "#ED8936", // Default tertiary color (orange 500)
          dark: "#C05621", // Darker shade of tertiary for light mode
        },
        "tertiary-dm": {
          light: "#F6AD55", // Light shade of tertiary for dark mode
          DEFAULT: "#D77D25", // Default tertiary color for dark mode
          dark: "#A0521D", // Darker shade of tertiary for dark mode
        },
        bg: {
          light: "#F3F4F6", // Light gray background (similar to VS Code light theme)
          DEFAULT: "#E4E4E7", // Soft gray for more depth
          dark: "#D1D5DB", // Medium gray for better contrast
        },
        "bg-dm": {
          light: "#4B4B4D", // A lighter dark gray for subtle contrast in dark mode
          DEFAULT: "#3C3C3E", // A balanced dark background resembling VS Code dark theme
          dark: "#2D2D2E", // A deep gray for sections that need more emphasis
        },
        text: {
          light: "#1F2937", // Dark gray text for light mode
          DEFAULT: "#111827", // Slightly darker gray for better readability
          dark: "#F9FAFB", // Light gray text for dark mode
        },
        "text-dm": {
          light: "#D1D5DB", // Light gray for text in dark mode
          DEFAULT: "#E4E4E7", // Slightly lighter text for improved contrast
          dark: "#FFFFFF", // Pure white for high contrast on dark backgrounds
        },
      },
    },
  },
  plugins: [],
};
