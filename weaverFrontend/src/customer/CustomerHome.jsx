import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";

const CustomerHome = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Check if user is logged in and is a customer
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "customer") {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch customer's orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:3001/api/orders?email=${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Customer Dashboard</h1>
      <p>Welcome! Place custom orders and track them below.</p>

      <Link to="/customer/customDress">
        <button style={styles.button}>Customize Your Dress</button>
      </Link>

      <h2 style={{ marginTop: "2rem" }}>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Product Type</th>
              <th>Color</th>
              <th>Border Color</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.dressType}</td>
                <td>{o.color}</td>
                <td>{o.borderColor}</td>
                <td>{o.size}</td>
                <td>{o.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  button: {
    margin: "1rem 0",
    padding: "0.7rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    maxWidth: "700px",
    margin: "1rem auto",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: "0.5rem",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ccc",
    padding: "0.5rem",
  },
};

export default CustomerHome;
