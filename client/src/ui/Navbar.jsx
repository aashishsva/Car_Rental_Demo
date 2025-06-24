import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/userlogin");
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>CarRental</Link>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <li><Link to="/" className={styles.btn}>Home</Link></li>
        <li><Link to="/cars" className={styles.btn}>Cars</Link></li>
        <li><Link to="/about" className={styles.btn}>About</Link></li>

        {!user ? (
          <li className={styles.dropdown}>
            <span className={styles.btn}>Login/Register ⬇</span>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/userlogin" className={styles.dropdownItem}>User Login</Link>
              </li>
              <li>
                <Link to="/register" className={styles.dropdownItem}>User Register</Link>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li className={styles.welcome}>Hi, {user.fullname}</li>
            <li><button className={styles.btn} onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
