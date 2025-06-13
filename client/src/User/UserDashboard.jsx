import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to User Dashboard</h2>
      <div className={styles.links}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/cars">Browse Cars</Link>
        <Link className={styles.link} to="/myorders">My Orders</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
