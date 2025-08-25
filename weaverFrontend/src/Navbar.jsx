import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css"; 
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    // Update role from localStorage
    const updateRole = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setRole(storedUser?.role || null);
    };

    useEffect(() => {
        updateRole();

        // Listen to storage changes (other tabs/windows)
        window.addEventListener("storage", updateRole);

        return () => {
            window.removeEventListener("storage", updateRole);
        };
    }, []);

    // ✅ Fix: re-check localStorage whenever component re-renders
    useEffect(() => {
        updateRole();
    }, [localStorage.getItem("user")]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setRole(null);
        navigate("/");
    };

    return (
        <nav className="navbar">
            {/* Left: Logo */}
            <div className="navbar-logo">
                <Link to="/">WeaveConnect</Link>
            </div>

            {/* Right: Links */}
            <div className="navbar-links">
                <Link to="/">Home</Link>

                {role === "weaver" && (
                    <Link to="/weaver">Admin</Link>
                )}
                {role === "customer" && (
                    <Link to="/customer">My Orders</Link>
                )}

                {role ? (
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="login-btn">
                            Login
                        </Link>
                        <Link to="/signup" className="signup-btn1">
                            Signup
                        </Link>
                        
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
