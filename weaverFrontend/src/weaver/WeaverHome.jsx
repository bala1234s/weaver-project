import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WeaverHome = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "weaver") {
      navigate("/login");
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/customOrders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptOrder = async (id) => {
    try {
      console.log(id);
      
      await axios.put(`http://localhost:3001/api/orders/${id}`, { status: "Accepted" });

      loadOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Weaver Dashboard</h2>
      <div style={styles.grid}>
        {orders.map(order => (
          <div key={order._id} style={styles.card}>
            <h3 style={styles.dressType}>{order.dressType}</h3>
            <p><strong>Color:</strong> {order.color}</p>
            <p><strong>Border Color:</strong> {order.borderColor}</p>
            <p><strong>Size/Length:</strong> {order.size}</p>
            <p><strong>Customer:</strong> {order.customerName} ({order.customerEmail})</p>
            <p>
              <strong>Status:</strong>
              <span style={{
                ...styles.status,
                backgroundColor: order.status === "Pending" ? "#f39c12" : "#27ae60"
              }}>
                {order.status}
              </span>
            </p>
            {order.status === "Pending" && (
              <button style={styles.button} onClick={() => acceptOrder(order._id)}>Accept</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#2c3e50",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "center",
  },
  card: {
    width: "250px",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  dressType: {
    color: "#2c3e50",
    marginBottom: "0.5rem",
  },
  status: {
    marginLeft: "0.5rem",
    padding: "0.2rem 0.5rem",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2980b9",
    color: "#fff",
    cursor: "pointer",
  },
};

export default WeaverHome;
