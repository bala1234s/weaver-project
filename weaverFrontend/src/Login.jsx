import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from './api'; // make sure you have an axios instance

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3001/auth/login", { email, password });
            if (res.data.role === "customer") {
                let info = { role: 'customer', email };
                localStorage.setItem('user', JSON.stringify(info));
                navigate("/customer");
            } else {
                let info = { role: 'weaver', email };
                localStorage.setItem('user', JSON.stringify(info));
                navigate("/weaver");
            }

        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
