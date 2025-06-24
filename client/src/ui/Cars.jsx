import React, { useEffect, useState } from "react";
import styles from "./Cars.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/postcars/all");
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleBookNow = (carId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "passenger") {
      alert("Please login as a passenger to book a car.");
      navigate("/userlogin");
      return;
    }

    navigate(`/user/booking?id=${carId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Available Cars for Rent</h1>
      <p className={styles.description}>
        Browse through our extensive collection of well-maintained cars. Whether you're looking for a budget ride, a family car, or something luxurious — we’ve got you covered!
      </p>

      <div className={styles.carList}>
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className={styles.card}>
              <img
                src={`http://localhost:5000/upload/${car.carimage1}`}
                alt={car.cartitle}
                className={styles.image}
              />
              <h3>{car.cartitle}</h3>
              <p>₹{car.price} / day</p>
              <p className={styles.locationText}>{car.location}</p>
              <button className={styles.btn} onClick={() => handleBookNow(car._id)}>
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No cars available right now.</p>
        )}
      </div>
    </div>
  );
};

export default Cars;
