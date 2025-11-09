import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../api/api";
import { toast } from "react-toastify";

import Orders from "./Orders";
import CompletedOrders from "./CompletedOrders";
import AddMenuItem from "./AddMenuItem";


const OwnerDashboard = () => {
  const [owner, setOwner] = useState(null);
  const [tab, setTab] = useState("orders");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("razi_user"));
    setOwner(u);
  }, []);

  if (!owner) return <p>Loading...</p>;
  if (owner === false) return <p>No owner found. Please login again.</p>;

  return (
    <div className="container mt-4">

      <h2 className='text-warning text-sm'>Restaurant Owner Dashboard</h2>
      <p className="text-light"><span className="text-info">Owner Email:</span> {owner.email}</p>

      <div className="btn-group my-4">
        <button className={`btn btn-${tab==="orders" ? "warning" : "outline-warning"}`}
          onClick={() => setTab("orders")}
        >
          Current Orders
        </button>

        <button className={`btn btn-${tab==="completed" ? "success" : "outline-success"}`}
          onClick={() => setTab("completed")}
        >
          Completed Orders
        </button>

        <button className={`btn btn-${tab==="menu" ? "primary" : "outline-primary"}`} 
          onClick={() => setTab("menu")}
        >
          Menu Management
        </button>
      </div>


      {tab === "orders" && <Orders restaurantId={owner.restaurantId} />}
      {tab === "completed" && <CompletedOrders restaurantId={owner.restaurantId} />}
      {tab === "menu" && <AddMenuItem restaurantId={owner.restaurantId} />}

    </div>
  );
};

export default OwnerDashboard;
