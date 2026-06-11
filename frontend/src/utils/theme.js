const THEME_KEY = "student_task_manager_theme";

export const getSavedTheme = () => {
    return localStorage.getItem(THEME_KEY) || "light";
};

export const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
};

export const getNextTheme = (theme) => {
    return theme === "dark" ? "light" : "dark";
};
