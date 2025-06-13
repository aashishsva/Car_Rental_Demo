import React, { useEffect, useState } from "react";
import styles from "./OrderCar.module.css";
import axios from "axios";

const OrderCar = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ordercar");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/ordercar/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className={styles.ordercarContainer}>
      <h2>All Ordered Cars</h2>

      <table className={styles.ordercarTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Owner</th>
            <th>Booking Date</th>
            <th>From</th>
            <th>To</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", color: "gray" }}>
                No records found.
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.carid?.cartitle || "N/A"}</td>
                <td>{order.ownerid?.fullname || "N/A"}</td>
                <td>{order.bookingdate}</td>
                <td>{order.sourcelocation}</td>
                <td>{order.destinationlocation}</td>
                <td>{order.pickuptime}</td>
                <td>{order.droptime}</td>
                <td>
                  <button
                    className={`${styles.actionBtn} ${styles.delete}`}
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderCar;
