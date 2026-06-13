import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Register() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: "",
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
            const response = await api.post("/auth/register", formData);

            toast.success(response.data.message || "Registration successful");
            setTimeout(() => {
                navigate("/login");
            }, 900);
        }catch(error){
            toast.error(error.response?.data?.message || "Unable to register");
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
                <p className="eyebrow">Create account</p>
                <h1>Register</h1>

                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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
                        placeholder="Enter a strong password"
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
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="auth-switch">
                    Already registered? <Link to="/login">Login</Link>
                </p>
            </form>
        </main>
    );
}

export default Register;
