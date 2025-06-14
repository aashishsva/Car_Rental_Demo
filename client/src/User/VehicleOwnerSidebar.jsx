// components/VehicleOwnerSidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VehicleOwnerSidebar.module.css";

const VehicleOwnerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem('fullname')
    navigate("/userlogin");
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.heading}>Owner Panel</h3>
      <ul className={styles.navList}>
        <li onClick={() => navigate("/vehicleowner/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/vehicleowner/postcar")}>Post Car</li>
        <li onClick={() => navigate("/vehicleowner/order")}>View Orders</li>
        <li onClick={() => navigate("/vehicleowner/profile")}>Profile</li>
        <li onClick={handleLogout} className={styles.logout}>Logout</li>
      </ul>
    </div>
  );
};

export default VehicleOwnerSidebar;
