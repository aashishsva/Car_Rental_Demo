import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserMyOrder.module.css";
import UserSidebar from "./UserSidebar";

export default function UserMyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/booking/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      const res = await axios.put(`http://localhost:5000/booking/cancel/${bookingId}`);
      if (res.data.success) {
        alert("Booking cancelled.");
        fetchOrders(); // refresh list
      } else {
        alert("Cancellation failed.");
      }
    } catch (err) {
      console.error("Cancel Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className={styles.container}>
      <UserSidebar />
      <div className={styles.content}>
        <h2 className={styles.heading}>My Orders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p className={styles.empty}>You have not ordered any cars yet.</p>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order._id} className={styles.card}>
                <img
                  src={`http://localhost:5000/upload/${order.carId?.carimage1}`}
                  alt={order.carId?.cartitle}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{order.carId?.cartitle}</h3>
                  <p><strong>Price:</strong> ₹{order.carId?.price}/day</p>
                  <p><strong>Pickup:</strong> {new Date(order.pickupDate).toLocaleDateString()}</p>
                  <p><strong>Drop:</strong> {new Date(order.dropDate).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {order.pickupLocation} → {order.dropLocation}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p><strong>Status:</strong>{" "}
                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                      {order.status}
                    </span>
                  </p>

                  {/* 🔴 Show cancel button only if status is Confirmed */}
                  {order.status === "Confirmed" && (
                    <button
                      className={styles.cancelBtn}
                      onClick={() => handleCancelBooking(order._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
