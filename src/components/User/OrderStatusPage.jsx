import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/api";
import { toast } from "react-toastify";

const OrderStatusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const loadOrder = async () => {
    try {
      const res = await apiClient.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // New average rating calculator
  const calcNewAverage = (oldAvg, count, newRating) => {
    const total = oldAvg * count + newRating;
    const newCount = count + 1;
    const newAvg = total / newCount;
    return { newAvg, newCount };
  };

  const submitRating = async (rating) => {
    try {
      // Update rating on order
      await apiClient.patch(`/orders/${id}`, { rating });

      // Update restaurant rating average
      const rest = (await apiClient.get(`/restaurants/${order.restaurantId}`)).data;
      const { newAvg, newCount } = calcNewAverage(
        rest.rating || 0,
        rest.ratingsCount || 0,
        rating
      );

      await apiClient.patch(`/restaurants/${rest.id}`, {
        rating: newAvg,
        ratingsCount: newCount,
      });

      toast.success("Thanks for rating!");

      // Redirect user back to home/products
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error("Rating failed");
    }
  };

  useEffect(() => {
    loadOrder();
    const interval = setInterval(loadOrder, 2000);
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <p className="text-center mt-5">Loading order...</p>;

  const statusSteps = [
    "Order placed",
    "Order Accepted",
    "Food processing",
    "Out for delivery",
    "Order delivered",
  ];

  const currentIndex = statusSteps.indexOf(order.status);

  return (
    <div className="container mt-4 text-center">

      <h2>Your Order Status</h2>
      <p>Order #{order.id}</p>

      {/* PROGRESS STEPS */}
      <div className="d-flex justify-content-between mt-4 mb-4">
        {statusSteps.map((s, idx) => (
          <div
            key={idx}
            className={`p-2 ${
              idx <= currentIndex ? "text-success fw-bold" : "text-muted"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <hr />

      {/* Rating Section – Only when delivered */}
      {order.status === "Order delivered" && (
        <div className="mt-4">
          <h4>Rate Your Experience</h4>

          {order.rating ? (
            <p className="text-success fw-bold">
              You rated: ⭐ {order.rating}
            </p>
          ) : (
            <div className="d-flex justify-content-center gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  className="btn btn-outline-warning"
                  onClick={() => submitRating(r)}
                >
                  ⭐ {r}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderStatusPage;
