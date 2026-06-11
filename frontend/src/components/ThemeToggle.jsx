import { useState } from "react";
import { applyTheme, getNextTheme, getSavedTheme } from "../utils/theme.js";

function ThemeToggle() {
    const [theme, setTheme] = useState(getSavedTheme());

    const handleToggle = () => {
        const nextTheme = getNextTheme(theme);

        applyTheme(nextTheme);
        setTheme(nextTheme);
    };

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={handleToggle}
        >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}

export default ThemeToggle;
