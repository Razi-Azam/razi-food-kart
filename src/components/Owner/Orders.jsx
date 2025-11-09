import React, { useEffect, useState } from "react";

const Orders = ({ restaurantId }) => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch(`http://localhost:4000/orders?restaurantId=${restaurantId}`);
      const data = await res.json();
      // show all except those moved to completed (we'll remove them from orders when marking done)
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (orderId, status) => {
    await fetch(`http://localhost:4000/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadOrders();
  };

  // Move to completedOrders collection and remove from orders
  const markAsDone = async (order) => {
    try {
      // Save into completedOrders
      await fetch(`http://localhost:4000/completedOrders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...order,
          completedAt: new Date().toISOString()
        })
      });

      // Delete from active orders
      await fetch(`http://localhost:4000/orders/${order.id}`, { method: "DELETE" });

      loadOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  const isDelivered = (status) => status === "Order delivered";

  return (
    <div>
      <h3>Current Orders</h3>
      <div className="mt-3">
        {orders.length === 0 && <p>No current orders.</p>}
        
        {orders.map(order => (
          <div className="card p-3 mb-3" key={order.id}>
            <h5>Order #{order.id}</h5>
            <p><strong>User:</strong> {order.userName || order.userId}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items?.map((it, idx) => (
                <li key={idx}>{it.name || it.itemId} — x{it.qty} — ₹{it.price}</li>
              ))}
            </ul>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Rating:</strong> {order.rating ?? "Not rated"}</p>

            <div className="btn-group" role="group">
              <button className="btn btn-sm btn-primary" disabled={isDelivered(order.status)} onClick={() => updateStatus(order.id, "Order Accepted")}>
                Accept Order
              </button>
              <button className="btn btn-sm btn-warning" disabled={isDelivered(order.status)} onClick={() => updateStatus(order.id, "Food processing")}>
                Process
              </button>
              <button className="btn btn-sm btn-info" disabled={isDelivered(order.status)} onClick={() => updateStatus(order.id, "Out for delivery")}>
                Out for Delivery
              </button>
              <button className="btn btn-sm btn-success" disabled={isDelivered(order.status)} onClick={() => updateStatus(order.id, "Order delivered")}>
                Delivered
              </button>
            </div>

            {/* Show only when delivered */}
            {isDelivered(order.status) && (
              <div className="mt-2">
                <button className="btn btn-dark btn-sm" onClick={() => markAsDone(order)}>Mark as Completed</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
