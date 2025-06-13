import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.dashboardContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
