import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role,] = useState("customer");

    const handleSignup = async (e) => {
        e.preventDefault(); // prevent page reload
        try {
            
            await axios.post("http://localhost:3001/auth/signup", { name, email, password, role});
            alert("User registered!");
        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
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
                <input
                    type="text"
                    placeholder="phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
