import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  // const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="rounded-full border border-gray-200 p-2 dark:bg-gray-600 cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <FiSun className="w-4 h-4 text-orange-500 hover:text-red-500" />
      ) : (
        <FiMoon className="w-4 h-4 hover:text-white dark:text-indigo-400" />
      )}
    </button>
  );
};

export default ThemeSwitch;
