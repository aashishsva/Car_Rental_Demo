// Home.js
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/postcars/all");
      setCars(res.data);
      setFilteredCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/locationMaster");
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchLocations();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleSearch = () => {
    let filtered = cars;
    if (location.trim()) {
      filtered = filtered.filter((car) =>
        car.location?.toLowerCase().includes(location.toLowerCase())
      );
    }
    setFilteredCars(filtered);
  };

  const handleBooking = (carId) => {
    if (!user) {
      alert("Please login as a Passenger to book a car.");
      navigate("/userlogin");
    } else {
      navigate(`/bookcar/${carId}`);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <h1>Find the Perfect Car for Your Journey</h1>
        <p>Affordable, reliable, and just a few clicks away.</p>
      </div>

      <h1 className={styles.heading}>Rent a Car</h1>
      <p className={styles.subheading}>
        {user
          ? `Welcome back, ${user.name}!`
          : "Choose from a wide range of vehicles for your needs."}
      </p>

      <div className={styles.searchBox}>
        <select
          className={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc._id} value={loc.locationname}>
              {loc.locationname}
            </option>
          ))}
        </select>

        <input
          type="date"
          className={styles.input}
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
        <input
          type="date"
          className={styles.input}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className={styles.carsSection}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className={styles.carCard}>
              <img
                src={`http://localhost:5000/upload/${car.carimage1}`}
                alt={car.cartitle}
                className={styles.carImage}
              />
              <h3 className={styles.carTitle}>{car.cartitle}</h3>
              <p className={styles.carPrice}>₹{car.price} /day</p>
              <p className={styles.carLocation}>{car.location}</p>
              <button
                className={styles.bookBtn}
                onClick={() => handleBooking(car._id)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>

      {/* Why Choose Us */}
      <div className={styles.whyChooseUs}>
        <h2>Why Choose Us</h2>
        <div className={styles.reasons}>
          <div className={styles.reasonCard}>
            <img src="/icons/trust.png" alt="Trusted" />
            <h3>Trusted & Verified</h3>
            <p>All vehicles and owners are verified and inspected regularly.</p>
          </div>
          <div className={styles.reasonCard}>
            <img src="/icons/support.png" alt="24/7 Support" />
            <h3>24/7 Support</h3>
            <p>We offer round-the-clock support for all your travel needs.</p>
          </div>
          <div className={styles.reasonCard}>
            <img src="/icons/booking.png" alt="Easy Booking" />
            <h3>Easy Booking</h3>
            <p>Book your ride in just a few clicks with seamless experience.</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={styles.servicesSection}>
        <h2>Our Services</h2>
        <ul className={styles.servicesList}>
          <li>✔ Airport Pickups & Drops</li>
          <li>✔ Outstation Car Rentals</li>
          <li>✔ Daily Commute Rentals</li>
          <li>✔ Chauffeur Driven Cars</li>
          <li>✔ Self-Drive Cars</li>
        </ul>
      </div>

      {/* Testimonials */}
      <div className={styles.testimonials}>
        <h2>What Our Customers Say</h2>
        <div className={styles.testimonialCards}>
          <div className={styles.testimonialCard}>
            <p>"Smooth experience and great service. Highly recommend!"</p>
            <h4>- Rohan Malhotra</h4>
          </div>
          <div className={styles.testimonialCard}>
            <p>"Clean cars and punctual service. Booking was very easy."</p>
            <h4>- Neha Sharma</h4>
          </div>
          <div className={styles.testimonialCard}>
            <p>"Affordable rates and helpful support team. Will use again."</p>
            <h4>- Aman Verma</h4>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h2>Ready to Hit the Road?</h2>
        <p>Sign up or login now and rent your perfect ride today.</p>
        <button className={styles.ctaButton} onClick={() => navigate("/userlogin")}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
