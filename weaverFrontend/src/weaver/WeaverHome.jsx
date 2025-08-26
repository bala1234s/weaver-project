import React, { useEffect, useState } from "react";
import axios from "axios";

const WeaverDashboard = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://weaver-project-backend.vercel.app/api/customOrders"); // fetch all orders
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
   
    fetchOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to accept this order?");
    if (!confirm) return; // If user clicks "Cancel", stop
    try {
      await axios.put(`https://weaver-project-backend.vercel.app/api/customOrders/${orderId}`, {
        status: "Accepted",
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Accepted" } : o))
      );
      fetchOrders();
      console.log("hello");
      
    } catch (err) {
      fetchOrders();
      // console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Weaver Dashboard</h1>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Dress Type</th>
            <th>Color</th>
            <th>Border Color</th>
            <th>Size</th>
            <th>Design Pattern</th>
            <th>Price</th>
            <th>Labor</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No orders yet.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.dressType}</td>
                <td>{order.color}</td>
                <td>{order.borderColor}</td>
                <td>{order.size}</td>
                <td>{order.designPattern || "None"}</td>
                <td>{order.price}</td>
                <td>{order.laborCharge}</td>
                <td>
                  <span
                    className={`badge ${order.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-success"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === "Pending" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => acceptOrder(order._id)}
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WeaverDashboard;
