import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role] = useState("customer"); 
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://weaver-project-backend.vercel.app/auth/signup", {
                name,
                email,
                password,
                phone,
                role,
            });
            alert("User registered!");
            navigate('/login');

        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create Account</h2>
                <p className="signup-subtitle">Join WeaveConnect as a valued customer</p>

                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="signup-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="signup-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="signup-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="signup-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>

                <p className="login-text">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
