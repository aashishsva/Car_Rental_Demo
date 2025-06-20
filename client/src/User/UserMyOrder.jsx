import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserMyOrder.module.css";
import UserSidebar from "./UserSidebar";

export default function UserMyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")); // 👈 logged-in passenger
  const userId = user?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/booking/user/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

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
                  src={`http://localhost:5000/uploads/${order.carId.carimage1}`} // 👈 car image from car schema
                  alt={order.carId.cartitle}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{order.carId.cartitle}</h3>
                  <p><strong>Price:</strong> ₹{order.carId.price}/day</p>
                  <p><strong>From:</strong> {order.from}</p>
                  <p><strong>To:</strong> {order.to}</p>
                  <p><strong>Status:</strong>{" "}
                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
