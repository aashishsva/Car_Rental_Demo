import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css'; 

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggleBtn} onClick={handleToggle}>
        {isCollapsed ? '☰' : '✖'}
      </button>

      {!isCollapsed && <h2 className={styles.sidebarTitle}>Admin Panel</h2>}

      <ul className={styles.sidebarList}>

        {/* Admin Dashboard Home */}
        <li>
          <Link to="/admindashboard" className={styles.sidebarLink}>
            <span className={styles.icon}>🏠</span>
            {!isCollapsed && <span className={styles.label}>Dashboard</span>}
          </Link>
        </li>

        {/* Category Master */}
        <li>
          <Link to="/admindashboard/categorymaster" className={styles.sidebarLink}>
            <span className={styles.icon}>🗂️</span>
            {!isCollapsed && <span className={styles.label}>Category Master</span>}
          </Link>
        </li>

        {/* Location Master */}
        <li>
          <Link to="/admindashboard/locationmaster" className={styles.sidebarLink}>
            <span className={styles.icon}>📍</span>
            {!isCollapsed && <span className={styles.label}>Location Master</span>}
          </Link>
        </li>

        {/* Vehicle Owner */}
        <li>
          <Link to="/admindashboard/vehicleowner" className={styles.sidebarLink}>
            <span className={styles.icon}>👤</span>
            {!isCollapsed && <span className={styles.label}>Vehicle Owner</span>}
          </Link>
        </li>

        {/* Order Car */}
        <li>
          <Link to="/admindashboard/ordercar" className={styles.sidebarLink}>
            <span className={styles.icon}>📦</span>
            {!isCollapsed && <span className={styles.label}>Order Car</span>}
          </Link>
        </li>

        {/* Logout */}
        <li>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <span className={styles.icon}>🔓</span>
            {!isCollapsed && <span className={styles.label}>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
