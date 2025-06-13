
import React from "react";
import { Navigate } from "react-router-dom";
import VehicleOwnerSidebar from "./VehicleOwnerSidebar";
import styles from "./VehicleOwnerDashboard.module.css";

const VehicleOwnerDashboard = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "vehicleowner") {
    return <Navigate to="/userlogin" />;
  }

  return (
    <div style={{ display: "flex" }} className={styles.dashboardContainer}>
      <VehicleOwnerSidebar />
      <div style={{ marginLeft: "250px", width: "100%", padding: "2rem" }} className={styles.mainContent}>
        <h2>Welcome to Vehicle Owner Dashboard</h2>
        <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
          Here you can manage your car listings and check customer orders.
        </p>

        <ul style={{ marginTop: "1.5rem", lineHeight: "1.8", fontSize: "1rem" }}>
          <li><strong>🚗 Post a Car:</strong> Add your car details to list it for rental.</li>
          <li><strong>📋 View Posted Cars:</strong> Edit or delete your existing car listings.</li>
          <li><strong>📦 Check Orders:</strong> View orders made by users for your cars.</li>
        </ul>
      </div>
    </div>
  );
};

export default VehicleOwnerDashboard;
