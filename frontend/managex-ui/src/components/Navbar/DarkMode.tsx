import React, { useState, useEffect } from "react";

export const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // On mount, check if dark mode was previously enabled in localStorage
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <div className="relative w-10 h-6 m-1 bg-gray-600 rounded-full shadow-inner transition duration-300 ease-in-out">
        <div
          className={`absolute w-5 h-5 translate-y-0.5 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
            darkMode
              ? "translate-x-4 bg-neutral-700"
              : "translate-x-1 bg-neutral-400"
          }`}
        ></div>
      </div>
    </label>
  );
};
