import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerDress = () => {
    const [dressType, setDressType] = useState("");
    const [color, setColor] = useState("");
    const [borderColor, setBorderColor] = useState("");
    const [size, setSize] = useState("");
    const [message, setMessage] = useState("");

    // User info state
    const [user, setUser] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.email) {
            // Fetch user info from backend
            axios.get(`http://localhost:3001/api/users?email=${storedUser.email}`)
                .then(res => {
                    setUser(res.data); // Assuming backend returns { name, email, phone }
                })
                .catch(err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            dressType,
            color,
            borderColor,
            size,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone
        };

        try {
            await axios.post("http://localhost:3001/api/customOrders", order);
            setMessage("Order placed successfully!");
            setDressType("");
            setColor("");
            setBorderColor("");
            setSize("");
        } catch (err) {
            console.error(err);
            setMessage("Failed to place order.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Place a Custom Dress Order</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>
                    Dress Type:
                    <select value={dressType} onChange={(e) => setDressType(e.target.value)} required>
                        <option value="">Select Dress</option>
                        <option value="Silk Saree">Silk Saree</option>
                        <option value="Cotton Saree">Cotton Saree</option>
                        <option value="Veshti">Veshti</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <label>
                    Main Color:
                    <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g., Red" required />
                </label>

                <label>
                    Border Color:
                    <input type="text" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} placeholder="e.g., Gold" />
                </label>

                <label>
                    Size / Length:
                    <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g., 6 yards" />
                </label>

                <button type="submit" style={styles.button}>Place Order</button>
            </form>

            {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" },
    form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", maxWidth: "400px", margin: "0 auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" },
    button: { padding: "0.7rem 1.5rem", border: "none", borderRadius: "5px", backgroundColor: "#2c3e50", color: "#fff", cursor: "pointer" }
};

export default CustomerDress;
