import React, { useEffect, useState } from "react";

const CompletedOrders = ({ restaurantId }) => {
  const [completed, setCompleted] = useState([]);

  const loadCompleted = async () => {
    try {
      const res = await fetch(`http://localhost:4000/completedOrders?restaurantId=${restaurantId}`);
      
      if (!res.ok) {
        console.error("Failed to fetch completed orders");
        return;
      }

      const data = await res.json();
      setCompleted(data);
    } catch (error) {
      console.error("Error loading completed orders:", error);
    }
  };

  useEffect(() => {
    loadCompleted();
    const interval = setInterval(loadCompleted, 2000);
    return () => clearInterval(interval);
  }, [restaurantId]);

  return (
    <div>
      <h3>Completed Orders</h3>

      {completed.length === 0 && <p>No completed orders yet.</p>}

      {completed.map(order => (
        <div key={order.id} className="card p-3 mb-3">
          <h5>Order #{order.id}</h5>
          <p><strong>User:</strong> {order.userName || order.userId}</p>

          <p><strong>Items:</strong></p>
          <ul>
            {order.items?.map((it, i) => (
              <li key={i}>{it.name} — x{it.qty} — ₹{it.price}</li>
            ))}
          </ul>

          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Status:</strong> Completed ✅</p>
          <p><strong>Completed At:</strong> {new Date(order.completedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CompletedOrders;
