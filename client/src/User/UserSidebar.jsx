import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserSidebar.module.css";

const UserSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user auth info
    navigate("/userlogin");
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Passenger Dashboard</h2>
      <nav className={styles.nav}>
        <Link to="/userdashboard" className={styles.navLink}>Dashboard</Link>
        <Link to="/user/booking" className={styles.navLink}>Booking</Link>
        <Link to="/user/profile" className={styles.navLink}>Profile</Link>
        <Link to="/user/myorder" className={styles.navLink}>My Orders</Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </nav>
    </aside>
  );
};

export default UserSidebar;
