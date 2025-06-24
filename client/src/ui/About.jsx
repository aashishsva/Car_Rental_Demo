import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.heading}>About CarRental</h1>

      <p className={styles.description}>
        <strong>CarRental</strong> is one of India’s most trusted online car rental services. Since our inception in 2023, we have provided easy, reliable, and safe travel experiences to thousands of satisfied customers across the country. Whether you need a car for business, family vacations, city tours, or outstation trips — we have a wide selection of vehicles suited to all needs and budgets.
      </p>

      <p className={styles.description}>
        Our platform connects customers directly to vehicle owners through a secure and transparent system. We believe in quality service, well-maintained vehicles, and complete customer satisfaction.
      </p>

      <h2 className={styles.subheading}>What We Offer</h2>
      <ul className={styles.list}>
        <li>🚗 Variety of Cars: From hatchbacks to luxury SUVs</li>
        <li>📅 Flexible Booking Options: Hourly, daily, or weekly</li>
        <li>💳 Secure Payments: Multiple payment methods supported</li>
        <li>🧾 Transparent Pricing: No hidden charges</li>
        <li>📞 24/7 Customer Support</li>
      </ul>

      <h2 className={styles.subheading}>Our Mission</h2>
      <p className={styles.description}>
        To make car renting fast, simple, and affordable for everyone, while empowering vehicle owners to earn by sharing their cars.
      </p>

      <h2 className={styles.subheading}>Contact Us</h2>
      <ul className={styles.contactList}>
        <li><strong>Email:</strong> carrentalhelp@gmail.com</li>
        <li><strong>Helpline:</strong> +91 1234567890</li>
        <li><strong>Address:</strong> Industry House, Plasia, Indore, 00000</li>
      </ul>
    </div>
  );
};

export default About;