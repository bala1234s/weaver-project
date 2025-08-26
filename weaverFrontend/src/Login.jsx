import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://weaver-project-backend.vercel.app/auth/login", {
                email,
                password,
            });

            if (res.data.role === "customer") {
                let info = { role: "customer", email };
                localStorage.setItem("user", JSON.stringify(info));
                navigate("/customer");
            } else {
                let info = { role: "weaver", email };
                localStorage.setItem("user", JSON.stringify(info));
                navigate("/weaver");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to continue to WeaveConnect</p>

                <input
                    type="email"
                    placeholder="Email Address"
                    className="login-input"
                    value={email}
                    
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>

                <p className="signup-text">
                    Don’t have an account? <Link to="/signup">sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
