import React from "react";
import styles from "./Home.module.css";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";
import car4 from "../assets/car4.png";


const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Rent a Car</h1>
      <p className={styles.subheading}>
        Choose from a wide range of vehicles for your needs.
      </p>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Location"
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Pick-up Date"
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Return Date"
          className={styles.input}
        />
        <button className={styles.searchBtn}>Search</button>
      </div>

      <div className={styles.carsSection}>
        {/* <img src="./assets/car1.png" alt="Car 1" className={styles.carImage} /> */}
        <img src={car1} alt="Car 1" className={styles.carImage} />
        <img src={car2} alt="Car 2" className={styles.carImage} />
        <img src={car3} alt="Car 3" className={styles.carImage} />
        <img src={car4} alt="Car 4" className={styles.carImage} />
        
      </div>
    </div>
  );
};

export default Home;
