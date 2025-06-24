import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.section}>
          <h3>About CarRental</h3>
          <p>
            CarRental is your trusted platform for hassle-free car rentals. Whether it's for a business trip, weekend getaway, or daily commute, we make mobility easy, affordable, and reliable.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/cars" className={styles.link}>Cars</Link></li>
            <li><Link to="/about" className={styles.link}>About</Link></li>
            <li><Link to="/userlogin" className={styles.link}>Login</Link></li>
            <li><Link to="/register" className={styles.link}>Register</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Contact Us</h3>
          <p>Email: carrentalhelp@gmail.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Royal Plaza, MG Road, New Delhi</p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Aashish Mehar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
