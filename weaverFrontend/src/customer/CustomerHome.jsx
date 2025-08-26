import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import "./CustomerHome.css"; 


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
        const res = await axios.get(`https://weaver-project-backend.vercel.app/api/orders?email=${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="customer-container">
      <h1 className="text-center mb-3">Customer Dashboard</h1>
      <p className="text-center">Welcome! Place custom orders and track them below.</p>

      <div className="text-center mb-4">
        <Link to="/customer/customDress">
          <button className="btn btn-primary">Customize Your Dress</button>
        </Link>
      </div>

      <h2 className="mt-4 mb-3">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
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
                  <td>
                    <span className={`badge ${o.status === "Pending" ? "bg-warning text-dark" : "bg-success"}`}>
                      {o.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default CustomerHome;
