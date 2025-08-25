import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerDress.css";
import { useNavigate } from "react-router-dom";

const CustomerDress = () => {
    const [dressType, setDressType] = useState("");
    const [color, setColor] = useState("");
    const [borderColor, setBorderColor] = useState("");
    const [size, setSize] = useState("");
    const [designPattern, setDesignPattern] = useState("");
    const [wantDesign, setWantDesign] = useState(false); // yes/no
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", phone: "" });

    const dressPrices = {
        "Silk Saree": 2500,
        "Cotton Saree": 1200,
        Veshti: 800,
        Other: 1000,
    };
    const laborCharge = 500;

    const designPrices = {
        Floral: 300,
        Geometric: 250,
        Traditional: 400,
        Modern: 350,
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.email) {
            axios
                .get(`http://localhost:3001/api/users?email=${storedUser.email}`)
                .then((res) => setUser(res.data))
                .catch((err) => console.error("Failed to fetch user info:", err));
        }
    }, []);

    // Price calculation
    useEffect(() => {
        if (dressType) {
            let basePrice = dressPrices[dressType] || 1000;
            let extraCost = 0;

            if (color && color.trim() !== "") extraCost += 100;
            if (borderColor && borderColor.trim() !== "") extraCost += 200;

            const sizeNumber = parseFloat(size);
            if (!isNaN(sizeNumber) && sizeNumber > 6) extraCost += (sizeNumber - 6) * 150;

            if (wantDesign && designPattern) extraCost += designPrices[designPattern] || 0;

            setPrice(basePrice + extraCost + laborCharge);
        }
    }, [dressType, color, borderColor, size, wantDesign, designPattern]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            dressType,
            color,
            borderColor,
            size,
            designPattern: wantDesign ? designPattern : "None",
            price,
            laborCharge,
            status: "Pending",
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone,
        };

        try {
            await axios.post("http://localhost:3001/api/customOrders", order);
            setMessage("Order placed successfully!");
            alert("Order placed successfully!");
            setDressType("");
            setColor("");
            setBorderColor("");
            setSize("");
            setDesignPattern("");
            setWantDesign(false);
            setPrice(0);
            navigate('/customer');
            window.location.reload();
        } catch (err) {
            console.error(err);
            setMessage("Failed to place order.");
        }
    };

    return (
        <div className="customer-dress-container">
            <h2 className="customer-dress-header">Place a Custom Dress Order</h2>
            <form className="customer-dress-form" onSubmit={handleSubmit}>
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

                <label>
                    Add Design Pattern?
                    <div style={{display:'flex'}}>
                        <input
                            type="radio"
                            id="designYes"
                            name="wantDesign"
                            value="yes"
                            checked={wantDesign === true}
                            onChange={() => { setWantDesign(true); setDesignPattern(""); }}
                        />
                        <label htmlFor="designYes">Yes</label>

                        <input
                            type="radio"
                            id="designNo"
                            name="wantDesign"
                            value="no"
                            checked={wantDesign === false}
                            onChange={() => { setWantDesign(false); setDesignPattern(""); }}
                            style={{ marginLeft: "1rem" }}
                        />
                        <label htmlFor="designNo">No</label>
                    </div>
                </label>

                {wantDesign && (
                    <label>
                        Select Design Pattern:
                        <select value={designPattern} onChange={(e) => setDesignPattern(e.target.value)} required>
                            <option value="">Select Design</option>
                            <option value="Floral">Floral (+₹300)</option>
                            <option value="Geometric">Geometric (+₹250)</option>
                            <option value="Traditional">Traditional (+₹400)</option>
                            <option value="Modern">Modern (+₹350)</option>
                        </select>
                    </label>
                )}

                <p>Labor Charge: ₹{laborCharge}</p>
                <h3 className="price-display">Total Price: ₹{price}</h3>
                <button className="place-order-btn" type="submit">Place Order</button>
            </form>

            {message && <p className="order-message">{message}</p>}
        </div>
    );
};

export default CustomerDress;
