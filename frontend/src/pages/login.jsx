import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { setToken, setUser } from "../utils/auth.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Login() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await api.post("/auth/login", formData);

            setToken(response.data.token);
            if(response.data.user){
                setUser(response.data.user);
            }
            toast.success(response.data.message || "Login successful");
            navigate("/dashboard");
        }catch(error){
            toast.error(error.response?.data?.message || "Unable to login");
        }finally{
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-theme-action">
                <ThemeToggle />
            </div>

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >
                <p className="eyebrow">Welcome back</p>
                <h1>Login</h1>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="auth-switch">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </form>
        </main>
    );
}

export default Login;
