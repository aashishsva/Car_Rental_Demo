import React from "react";
import { Link } from "react-router-dom"; // <-- Add this line
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>CarRental</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.btn}>Home</Link>
        </li>
        <li>
          <Link to="/cars" className={styles.btn}>Cars</Link>
        </li>
        <li>
          <Link to="/order-car" className={styles.btn}>Order Car</Link>
        </li>
        <li>
          <Link to="/userlogin" className={styles.btn}>User Login</Link>
        </li>
        <li>
          <Link to="/register" className={styles.btn}>User Registration</Link>
        </li>
        <li>
          <Link to="/login" className={styles.btn}>Admin Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
