
import { useNavigate } from "react-router-dom";
import { getUserName, removeToken } from "../utils/auth.js";
import ThemeToggle from "./ThemeToggle.jsx";

function Header() {
    const navigate = useNavigate();
    const userName = getUserName();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <header className="app-header"> 
            <div>
                <p className="eyebrow">Dashboard</p>
                <h1>Student Task Manager</h1>
                <p className="dashboard-greeting">
                    Welcome back{userName ? `, ${userName}` : ""}! 👋
                </p>
            </div>

            <div className="header-actions">
                <ThemeToggle />

                <button
                    type="button"
                    className="secondary-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
