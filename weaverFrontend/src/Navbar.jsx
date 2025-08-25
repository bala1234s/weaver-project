import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    // Function to update role from localStorage
    const updateRole = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setRole(storedUser?.role || null);
    };

    useEffect(() => {
        // Run on mount
        updateRole();

        // Listen for changes to localStorage from other tabs/windows
        window.addEventListener("storage", updateRole);

        return () => {
            window.removeEventListener("storage", updateRole);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setRole(null);
        navigate("/");
    };

    return (
        <div style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>

            {role ? (
                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: "1rem",
                        padding: "0.3rem 0.6rem",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </div>
    );
}

export default Navbar;
