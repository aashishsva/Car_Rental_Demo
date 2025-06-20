import React, { useEffect, useState } from 'react';
import styles from './UserBooking.module.css';
import UserSidebar from './UserSidebar';
import axios from 'axios';

export default function UserBooking() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
  fetchCars();
}, []);

const fetchCars = async () => {
  try {
    const res = await axios.get("http://localhost:5000/postcars/booking");
    setCars(res.data);
  } catch (err) {
    console.error("Booking car fetch error:", err);
  }
};



  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <UserSidebar />
      </div>
      <div className={styles.mainContent}>
        <h2 className={styles.heading}>Available Cars for Booking</h2>
        <div className={styles.orderList}>
          {cars.length === 0 ? (
            <p className={styles.empty}>No cars available for booking at the moment.</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className={styles.card}>
                <img
                  src={car.carimage1 ? `http://localhost:5000/upload/${car.carimage1}` : 'https://via.placeholder.com/150'}
                  alt={car.cartitle}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{car.cartitle}</h3>
                  <p><strong>Price:</strong> ₹{car.price}/day</p>
                  <p><strong>Model:</strong> {car.variant}</p>
                  <p><strong>RC Number:</strong> {car.carvehicleno}</p>
                  <p><strong>Owner:</strong> {car.vehicleownerid?.fullname || 'N/A'}</p>
                  <button className={styles.bookBtn}>Book This Car</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
