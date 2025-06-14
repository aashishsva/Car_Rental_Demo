import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleOwnerSidebar from './VehicleOwnerSidebar';
import styles from './VehicleOwnerOrder.module.css';

const VehicleOwnerOrder = () => {
  const [orders, setOrders] = useState([]);
  const currentOwnerId = localStorage.getItem('vehicleownerid');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/ordercar', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        const ownerOrders = res.data.filter(
          (order) => order.car?.vehicleownerid === currentOwnerId
        );

        setOrders(ownerOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [currentOwnerId]);

  return (
    <div className={styles.dashboardContainer}>
      <VehicleOwnerSidebar />
      <div className={styles.mainContent}>
        <h2>My Car Orders</h2>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Car Title</th>
              <th>Ordered By</th>
              <th>Order Date</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.car?.cartitle || 'N/A'}</td>
                <td>{order.user?.fullname || 'N/A'}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.pickupLocation}</td>
                <td>{order.dropLocation}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleOwnerOrder;
