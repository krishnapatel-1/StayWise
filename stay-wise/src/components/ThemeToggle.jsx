import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/ThemeToggle.css"; // 👈 make sure you import the CSS if it's in a separate file

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-wrapper">
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}
