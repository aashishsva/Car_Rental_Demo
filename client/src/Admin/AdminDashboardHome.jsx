import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboardHome.module.css";

const AdminDashboardHome = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Category Master",
      path: "/admindashboard/category",
      description: "Manage different car categories like SUV, Sedan, Hatchback, etc.",
    },
    {
      title: "Location Master",
      path: "/admindashboard/location",
      description: "Define service locations where cars are available for rent.",
    },
    {
      title: "Vehicle Owner",
      path: "/admindashboard/vehicle-owner",
      description: "View and manage all registered vehicle owners on the platform.",
    },
    {
      title: "Order Car",
      path: "/admindashboard/ordercar",
      description: "View and manage all car rental orders made by users.",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>
      <p className={styles.subheading}>Manage the core modules of your car rental platform</p>
      <div className={styles.cardContainer}>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => navigate(item.path)}
          >
            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
