import React from "react";
import UserSidebar from "./UserSidebar";
import styles from "./UserDashboard.module.css";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")); // 👈 get logged-in user
  const name = user?.fullname || "User";

  return (
    <div className={styles.dashboardLayout}>
      <UserSidebar />

      <main className={styles.mainContent}>
        <h1 className={styles.heading}>Welcome, {name} 👋</h1>
        <p className={styles.subHeading}>What would you like to do today?</p>

        <div className={styles.cardGrid}>
          <Link to="/user/booking" className={styles.card}>
            <h2>🚗 Book a Car</h2>
            <p>Start a new car rental journey.</p>
          </Link>

          <Link to="/user/myorder" className={styles.card}>
            <h2>📋 My Orders</h2>
            <p>Check your past and upcoming bookings.</p>
          </Link>

          <Link to="/user/profile" className={styles.card}>
            <h2>👤 Profile</h2>
            <p>View or update your personal information.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
